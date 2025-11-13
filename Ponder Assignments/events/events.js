// events.js
let tasks = [];

function renderTasks(tasks) {
  const listEl = document.querySelector("#todoList");
  listEl.innerHTML = tasks.map(task => `
    <li class="${task.completed ? 'strike' : ''}">
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>
  `).join("");
}

function newTask() {
  const input = document.querySelector("#todo");
  const taskDetail = input.value.trim();
  if (!taskDetail) return; // prevent blank tasks

  tasks.push({ detail: taskDetail, completed: false });
  input.value = ""; // clear input
  renderTasks(tasks);
}

function removeTask(taskElement) {
  const text = taskElement.querySelector('p').innerText;
  tasks = tasks.filter(task => task.detail !== text);
  taskElement.remove();
}

function completeTask(taskElement) {
  const text = taskElement.querySelector('p').innerText;
  const index = tasks.findIndex(task => task.detail === text);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    taskElement.classList.toggle("strike");
  }
}

function manageTasks(event) {
  const li = event.target.closest("li");
  if (!li) return;

  const action = event.target.dataset.action;
  if (action === "delete") removeTask(li);
  if (action === "complete") completeTask(li);
}

// Event listeners
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

// Initial render
renderTasks(tasks);
