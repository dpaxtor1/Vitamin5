const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let todos = [];

// Function to add a new to-do item
function addTodo(todoText) {
  const newTodo = {
    id: Date.now(), // A simple unique identifier
    text: todoText,
    completed: false,
  };
  todos.push(newTodo);
}

// Function to remove a to-do item by ID
function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
}

// Function to toggle the completion status of a to-do item
function toggleTodoCompletion(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
}

// Example usage:
addTodo("Learn React");
addTodo("Build a To-Do App");
addTodo("Go for a run");

console.log(todos); // Output: Array of to-do items

removeTodo(todos[1].id); // Remove the second to-do item

toggleTodoCompletion(todos[0].id); // Toggle the completion status of the first to-do item

console.log(todos); // Output: Updated array of to-do items

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (todo) {
    todo.task = task;
    res.json(todo);
  } else {
    res.status(404).send('To-Do item not found');
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});


