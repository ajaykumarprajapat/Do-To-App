document.addEventListener('DOMContentLoaded', () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage if available
  
    const addTaskButton = document.getElementById('add-task-button');
    const taskInput = document.getElementById('task-input');
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');
    const showPendingButton = document.getElementById('show-pending');
    const showCompletedButton = document.getElementById('show-completed');
  
    const renderTasks = () => {
      pendingList.innerHTML = '';
      completedList.innerHTML = '';
  
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <span>${task.description}</span>
          <span>${task.createdAt}</span>
          <button class="complete-btn">Complete</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        `;
  
        // If task is completed, show it in the completed list
        if (task.completed) {
          completedList.appendChild(taskItem);
        } else {
          pendingList.appendChild(taskItem);
        }
  
        // Event Listeners for actions
        taskItem.querySelector('.complete-btn').addEventListener('click', () => completeTask(task));
        taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(task));
        taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task));
      });
    };
  
    const addTask = (description) => {
      const newTask = {
        description,
        createdAt: new Date().toLocaleString(),
        completed: false,
        completedAt: null,
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
    };
  
    const completeTask = (task) => {
      task.completed = true;
      task.completedAt = new Date().toLocaleString();
      saveTasks();
      renderTasks();
    };
  
    const editTask = (task) => {
      const newDescription = prompt('Edit task:', task.description);
      if (newDescription) {
        task.description = newDescription;
        saveTasks();
        renderTasks();
      }
    };
  
    const deleteTask = (task) => {
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
    };
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Show only pending tasks
    showPendingButton.addEventListener('click', () => {
      pendingList.style.display = 'block';
      completedList.style.display = 'none';
    });
  
    // Show only completed tasks
    showCompletedButton.addEventListener('click', () => {
      pendingList.style.display = 'none';
      completedList.style.display = 'block';
    });
  
    addTaskButton.addEventListener('click', () => {
      const taskDescription = taskInput.value.trim();
      if (taskDescription) {
        addTask(taskDescription);
        taskInput.value = ''; // Clear input field
      }
    });
  
    // Initial render of tasks
    renderTasks();
  });
  