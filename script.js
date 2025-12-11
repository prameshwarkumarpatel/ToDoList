const colors = [
  'hsl(0, 100%, 55%)',    // red
  'hsl(60, 100%, 55%)',   // yellow
  'hsl(120, 100%, 55%)',  // green
  'hsl(180, 100%, 55%)',  // cyan
  'hsl(240, 100%, 55%)',  // blue
  'hsl(300, 100%, 55%)',  // magenta
  'hsl(330, 100%, 55%)'   // pink
];

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.style.setProperty('--task-color', todo.color);
    li.style.setProperty('--task-color-hue', todo.hue);
    
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} 
             onchange="toggleTodo(${index})">
      <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${index})">×</button>
    `;
    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const hue = parseInt(color.match(/hsl\((\d+)/)[1]);
    
    todos.push({
      text,
      completed: false,
      color,
      hue
    });
    
    todoInput.value = '';
    saveTodos();
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Event listeners
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Initial render
renderTodos();
