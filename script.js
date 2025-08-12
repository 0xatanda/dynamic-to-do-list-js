document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    function addTask(taskText = null, save = true) {
        const text = taskText || taskInput.value.trim();

        if (text === "") {
            alert('Please enter a task');
            return;
        }

        const li = document.createElement('li');
        li.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeFromLocalStorage(text);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (!taskText) {
            taskInput.value = "";
        }

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
