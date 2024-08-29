const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const actionButton = document.getElementById("action-button");
let isEditing = false;
let currentLiIndex = null;

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");   
    } else {
        if (isEditing) {
            const li = listContainer.children[currentLiIndex]; 
            li.childNodes[0].textContent = inputBox.value;  
            resetEditing();
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);

            let editSpan = document.createElement("span"); 
            editSpan.className = "edit"; 
            editSpan.innerHTML = "\u270E"; 
            li.appendChild(editSpan);

            let deleteSpan = document.createElement("span");
            deleteSpan.className = "delete";
            deleteSpan.innerHTML = "\u00D7"; 
            li.appendChild(deleteSpan);
        }
        inputBox.value = ""; 
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit")) {
        editTask(e.target.parentElement);
    }
}, false);

function editTask(li) { 
    inputBox.value = li.childNodes[0].textContent;
    actionButton.textContent = 'Update';
    isEditing = true;
    currentLiIndex = Array.prototype.indexOf.call(listContainer.children, li);
}

function resetEditing() {
    isEditing = false;
    currentLiIndex = null;
    actionButton.textContent = 'Add';
}

function saveData() {
    const tasks = Array.from(listContainer.children).map(task => {
        return {
            text: task.childNodes[0].textContent,
            checked: task.classList.contains("checked")
        };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")); 
    if (savedTasks) {
        savedTasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;
            if (task.checked) li.classList.add("checked");
            listContainer.appendChild(li);

            let editSpan = document.createElement("span");
            editSpan.className = "edit";
            editSpan.innerHTML = "\u270E"; 
            li.appendChild(editSpan);

            let deleteSpan = document.createElement("span");
            deleteSpan.className = "delete";
            deleteSpan.innerHTML = "\u00D7"; 
            li.appendChild(deleteSpan);
        });
    }
}


showTasks();
