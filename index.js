const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require("./notes.controller");
const { title } = require("process");
const { error } = require("console");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    error: false,
    created: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      error: false,
      created: true,
    });
  } catch (e) {
    console.error("Creation error", e);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      error: true,
      created: false,
    });
  }
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    error: false,
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await editNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    error: false,
    created: false,
  });
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/notes?authSource=admin")
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
