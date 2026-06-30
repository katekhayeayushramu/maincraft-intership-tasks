// Load tasks from LocalStorage, or start with an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Keep track of which task is currently being edited
let editingId = null;

// Save current tasks array to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------- CREATE ----------
function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (!value) {
    alert("Task cannot be empty!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  input.value = "";
  renderTasks();
}

// Allow pressing Enter to add a task
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") addTask();
  });
  renderTasks();
});

// ---------- DELETE ----------
function deleteTask(id) {
  if (!confirm("Delete this task?")) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// ---------- UPDATE (toggle complete) ----------
function toggleComplete(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

// ---------- UPDATE (edit text) ----------
function startEdit(id) {
  editingId = id;
  renderTasks();
}

function saveEdit(id) {
  const input = document.getElementById(`edit-input-${id}`);
  const newValue = input.value.trim();

  if (!newValue) {
    alert("Task cannot be empty!");
    return;
  }

  tasks = tasks.map(t =>
    t.id === id ? { ...t, name: newValue } : t
  );

  editingId = null;
  saveTasks();
  renderTasks();
}

// ---------- READ + FILTER + SEARCH ----------
function renderTasks() {
  const list = document.getElementById("taskList");
  const emptyMsg = document.getElementById("emptyMsg");
  const stats = document.getElementById("taskStats");

  const searchQuery = document.getElementById("searchBox").value.toLowerCase();
  const filterValue = document.getElementById("filterSelect").value;

  // Apply search filter
  let filteredTasks = tasks.filter(t =>
    t.name.toLowerCase().includes(searchQuery)
  );

  // Apply status filter
  if (filterValue === "completed") {
    filteredTasks = filteredTasks.filter(t => t.completed);
  } else if (filterValue === "pending") {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  }

  list.innerHTML = "";

  if (filteredTasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    if (editingId === task.id) {
      // Render edit mode
      li.innerHTML = `
        <input type="text" id="edit-input-${task.id}" class="task-edit-input" value="${escapeHtml(task.name)}">
        <div class="task-actions">
          <button class="save-btn" onclick="saveEdit(${task.id})">Save</button>
        </div>
      `;
    } else {
      // Render normal mode
      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})">
          <span class="task-text ${task.completed ? "completed" : ""}">${escapeHtml(task.name)}</span>
        </div>
        <div class="task-actions">
          <button class="edit-btn" onclick="startEdit(${task.id})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
    }

    list.appendChild(li);
  });

  // Update stats
  const completedCount = tasks.filter(t => t.completed).length;
  stats.textContent = `${tasks.length} total · ${completedCount} completed · ${tasks.length - completedCount} pending`;
}

// Helper to prevent HTML injection from task text
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
