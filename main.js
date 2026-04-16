const taskInput = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-btn");
const taskList = document.querySelector("#task-list");
const counter = document.querySelector("#counter");

const updateCounter = () => {
  const pending = taskList.querySelectorAll(".task-item:not(.task-item--completed)").length;
  counter.textContent = pending;
};

const addTask = () => {
  const text = taskInput.value.trim();

  if (!text) {
    taskInput.classList.add("error");
    taskInput.focus();
    taskInput.addEventListener("animationend", () => taskInput.classList.remove("error"), { once: true });
    return;
  }

  const emptyMsg = taskList.querySelector(".task-list__empty");
  if (emptyMsg) emptyMsg.remove();

  const li = document.createElement("li");
  li.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("task-item__check");

  const span = document.createElement("span");
  span.classList.add("task-item__text");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("task-item__delete");
  deleteBtn.setAttribute("title", "Eliminar tarea");
  deleteBtn.setHTMLUnsafe(
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
      <path d="M10 11v6"></path><path d="M14 11v6"></path>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
    </svg>`
  );

  checkbox.addEventListener("change", () => {
    li.classList.toggle("task-item--completed", checkbox.checked);
    updateCounter();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();

    if (taskList.querySelectorAll(".task-item").length === 0) {
      const empty = document.createElement("li");
      empty.classList.add("task-list__empty");
      empty.textContent = "No hay tareas. Agrega una para comenzar.";
      taskList.append(empty);
    }
  });

  li.append(checkbox, span, deleteBtn);
  taskList.append(li);

  taskInput.value = "";
  taskInput.focus();
  updateCounter();
};

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

const empty = document.createElement("li");
empty.classList.add("task-list__empty");
empty.textContent = "No hay tareas. Agrega una para comenzar.";
taskList.append(empty);