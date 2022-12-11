"use strict";
const list = document.querySelector('#list');
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-form-input');
const errorMsg = document.getElementById('error-msg');
const tasksList = loadTask();
tasksList.forEach(addListItem);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!input.value) {
        errorMsg.style.display = 'block';
        return;
    }
    const newTask = {
        id: 'item' + new Date().getMilliseconds() + Math.floor(Math.random() * 1000),
        title: input.value,
        completed: false,
        createdAt: new Date(),
    };
    errorMsg.style.display = 'none';
    tasksList.push(newTask);
    saveTasks();
    addListItem(newTask);
    input.value = '';
});
function addListItem(task) {
    const listItem = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
    });
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    listItem.append(label, `Created on: ${task.createdAt.toLocaleString().substring(0, 10)}`);
    list.append(listItem);
}
function saveTasks() {
    localStorage.setItem('Tasks', JSON.stringify(tasksList));
}
function loadTask() {
    let storageList = localStorage.getItem('Tasks');
    if (storageList == null)
        return [];
    return JSON.parse(storageList);
}
