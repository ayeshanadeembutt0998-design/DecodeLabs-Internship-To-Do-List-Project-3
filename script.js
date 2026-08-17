/* ==================================================
   SELECT HTML ELEMENTS
================================================== */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

const themeToggle = document.getElementById("themeToggle");

const filterButtons = document.querySelectorAll(".filter-btn");


/* ==================================================
   TASK ARRAY
================================================== */

let tasks = [];
let currentFilter = "all";

/* ==================================================
   ADD TASK
================================================== */

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't add an empty task
    if (taskText === "") {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    taskInput.focus();

    displayTasks();
}


/* ==================================================
   DISPLAY TASKS
================================================== */

function displayTasks() {

    // Clear existing tasks
    taskList.innerHTML = "";

    // Filter tasks
    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }


    // Show / hide empty message
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }


    // Create each task
    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");

        li.classList.add("task-item");


        // Add completed class
        if (task.completed) {
            li.classList.add("completed");
        }


        /* Checkbox */

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        /* Task text */

        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        /* Delete button */

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.innerHTML = '<i class="ri-delete-bin-6-line"></i>';

        deleteButton.type = "button";


        /* Add elements to task */

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);


        /* Complete task */

        checkbox.addEventListener("change", function () {

            toggleTask(task.id);

        });


        /* Delete task */

        deleteButton.addEventListener("click", function () {

            deleteTask(task.id);

        });

    });


    updateStats();
}


/* ==================================================
   COMPLETE / UNCOMPLETE TASK
================================================== */

function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;

    });

    displayTasks();
}


/* ==================================================
   DELETE TASK
================================================== */

function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });

    displayTasks();
}


/* ==================================================
   UPDATE TASK STATISTICS
================================================== */

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {

        return task.completed;

    }).length;

    const remaining = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    remainingTasks.textContent = remaining;
}


/* ==================================================
   FILTER TASKS
================================================== */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class to clicked button
        button.classList.add("active");


        // Change current filter
        currentFilter = button.dataset.filter;


        // Display filtered tasks
        displayTasks();

    });

});


/* ==================================================
   ADD TASK BUTTON
================================================== */

addTaskBtn.addEventListener("click", function () {

    addTask();

});


/* ==================================================
   ADD TASK USING ENTER KEY
================================================== */

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});


/* ==================================================
   DARK / LIGHT MODE
================================================== */

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    /*
        Change Remix Icon according
        to the current theme.
    */

    if (document.body.classList.contains("dark")) {

        themeToggle.innerHTML = '<i class="ri-sun-line"></i>';

    } else {

        themeToggle.innerHTML = '<i class="ri-moon-line"></i>';

    }

});


/* ==================================================
   INITIAL DISPLAY
================================================== */

displayTasks();