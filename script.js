const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");
const taskCounter = document.getElementById("taskCounter");

loadTasks();

function updateCounter(){

    const totalTasks = taskList.children.length;

    const completedTasks =
        document.querySelectorAll(".completed").length;

    const pendingTasks =
        totalTasks - completedTasks;

    taskCounter.innerText =
        `Total: ${totalTasks} | Completed: ${completedTasks} | Pending: ${pendingTasks}`;
}

function saveTasks(){
    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );
}

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Enter a task!");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;

    span.addEventListener("click", function(){

        span.classList.toggle("completed");

        updateCounter();

        saveTasks();
    });

    const deleteBtn =
        document.createElement("button");

    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click",
        function(){

            li.remove();

            updateCounter();

            saveTasks();
        });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounter();

    saveTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress",
    function(e){

        if(e.key === "Enter"){
            addTask();
        }
});

themeBtn.addEventListener("click",
    function(){

        document.body.classList
            .toggle("dark-mode");

        if(document.body.classList
            .contains("dark-mode")){

            themeBtn.innerText =
                "☀️ Light Mode";
        }
        else{

            themeBtn.innerText =
                "🌙 Dark Mode";
        }
});

clearBtn.addEventListener("click",
    function(){

        taskList.innerHTML = "";

        updateCounter();

        saveTasks();
});

function loadTasks(){

    const savedTasks =
        localStorage.getItem("tasks");

    if(savedTasks){

        taskList.innerHTML =
            savedTasks;

        reattachEvents();
    }

    updateCounter();
}

function reattachEvents(){

    document.querySelectorAll("li")
    .forEach(function(li){

        const span =
            li.querySelector("span");

        const deleteBtn =
            li.querySelector("button");

        span.addEventListener("click",
            function(){

                span.classList
                    .toggle("completed");

                saveTasks();
        });

        deleteBtn.addEventListener(
            "click",
            function(){

                li.remove();

                updateCounter();

                saveTasks();
        });
    });
}