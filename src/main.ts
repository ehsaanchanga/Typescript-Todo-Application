const list = document.querySelector('#list') as HTMLUListElement;
const form = document.querySelector('#todo-form') as HTMLFormElement;
const input = document.querySelector('#todo-form-input') as HTMLInputElement;
const errorMsg = document.getElementById('error-msg') as HTMLParagraphElement;
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const tasksList: Array<Task> = loadTask();

tasksList.forEach(addListItem);

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!input.value) {
    errorMsg.style.display = 'block';
    return;
  }

  const newTask: Task = {
    id:
      'item' + new Date().getMilliseconds() + Math.floor(Math.random() * 1000),
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

function addListItem(task: Task) {
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
  listItem.append(
    label,
    `Created on: ${task.createdAt.toLocaleString().substring(0, 10)}`
  );
  list.append(listItem);
}

function saveTasks() {
  localStorage.setItem('Tasks', JSON.stringify(tasksList));
}

function loadTask(): Task[] {
  let storageList = localStorage.getItem('Tasks');
  if (storageList == null) return [];
  return JSON.parse(storageList);
}
