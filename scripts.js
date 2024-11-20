// Seleciona os elementos do formulário e da lista
const form = document.querySelector("form");
const taskInput = document.getElementById("task");
const taskList = document.querySelector("ul");
const taskCount = document.querySelector("#task-count");
const completedCount = document.querySelector("#completed-count");
const noTasksMessage = document.querySelector("#no-tasks-message");

// Inicializa os contadores
let totalTasks = 0;
let completedTasks = 0;

// Captura o evento de submit do formulário para adicionar uma nova tarefa
form.onsubmit = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTask(taskText);
        taskInput.value = ""; // Limpa o input
        updateTaskCounts();
    }
}

// Adiciona uma nova tarefa à lista
function addTask(taskText) {
    totalTasks++;

    const taskItem = document.createElement("li");
    taskItem.classList.add("task");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    taskItem.appendChild(taskContent);

    const completeButton = document.createElement("button");
    completeButton.textContent = "( )";
    completeButton.classList.add("complete-button");
    completeButton.onclick = () => markTaskAsCompleted(taskItem);
    taskItem.appendChild(completeButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.classList.add("remove-button");
    removeButton.onclick = () => removeTask(taskItem);
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);
    updateNoTasksMessage();
}

// Marca uma tarefa como concluída
function markTaskAsCompleted(taskItem) {
    taskItem.classList.toggle("completed");
    completedTasks += taskItem.classList.contains("completed") ? 1 : -1;
    updateTaskCounts();
}

// Remove uma tarefa da lista
function removeTask(taskItem) {
    if (taskItem.classList.contains("completed")) {
        completedTasks--;
    }
    totalTasks--;
    taskList.removeChild(taskItem);
    updateTaskCounts();
    updateNoTasksMessage();
}

// Atualiza os contadores de tarefas
function updateTaskCounts() {
    taskCount.textContent = `Total de Tarefas: ${totalTasks}`;
    completedCount.textContent = `Tarefas Concluídas: ${completedTasks}`;
}

// Atualiza a mensagem de visualização quando não há tarefas
function updateNoTasksMessage() {
    noTasksMessage.style.display = totalTasks === 0 ? "block" : "none";
}