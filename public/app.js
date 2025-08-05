document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const liElement = event.target.closest("li");
    const currentTitle = liElement.firstChild.textContent.trim();

    const newTitle = prompt("Введите новое название", currentTitle);

    if (newTitle !== null && newTitle !== currentTitle) {
      edit(id, newTitle).then(() => {
        liElement.firstChild.textContent = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", //Заголовок для json
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
