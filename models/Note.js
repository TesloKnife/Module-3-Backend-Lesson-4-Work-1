const mongoose = require("mongoose");
const { required } = require("yargs");

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
