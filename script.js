const formE1 = document.querySelector(".form");
const inputE1 = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")) || [];

list.forEach(task => {
  toDoList(task);
});

formE1.addEventListener("submit", (e) => {
  e.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputE1.value.trim();
  if (task) {
    newTask = task.name;
  }

  if (newTask === "") return;

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  liEl.innerText = newTask;

  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  const checkBtnEl = document.createElement("i");
  checkBtnEl.className = "fa-solid fa-circle-check";
  iconContainer.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("i");
  trashBtnEl.className = "fa-solid fa-trash-can";
  iconContainer.appendChild(trashBtnEl);

  liEl.appendChild(iconContainer);
  ulEl.appendChild(liEl);
  inputE1.value = "";

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  let list = [];
  liEls.forEach(liEl => {
    list.push({
      name: liEl.childNodes[0].nodeValue.trim(),
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
