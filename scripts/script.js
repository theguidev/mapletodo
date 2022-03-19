
const submitButton = document.querySelector('#push')
const todoInput = document.querySelector('#newtask input')


const localTasks = localStorage.getItem("tasks")
if(localTasks) {
    JSON.parse(localTasks).forEach(task => {
        document.querySelector('#tasks').innerHTML += `<div class="task">
        <span id="taskname">${task.value}</span>
        <button class="delete">
        <input type="image" class="trash" src="./images/trash.svg"></input>
        </button>
        </div>`
    })
}
const tasks = localTasks ? JSON.parse(localTasks) : [];

function removeToDo(e) {
    if(e.target.classList.contains("trash")) {
        const value = e.target.parentElement.parentElement.children[0].textContent
        console.log(tasks)
        const toRemoveIndex = tasks.findIndex(task => task.value === value);
        tasks.splice(toRemoveIndex, 1)
        localStorage.setItem("tasks",JSON.stringify(tasks))
        e.target.parentElement.parentElement.remove();
        console.log("aq")
    } else {
        const value = e.target.parentElement.children[0].textContent
        console.log(tasks)
        const toRemoveIndex = tasks.findIndex(task => task.value === value);
        tasks.splice(toRemoveIndex, 1)
        localStorage.setItem("tasks",JSON.stringify(tasks))
        e.target.parentElement.remove();
        console.log("aq2")
    }
}

function toggleDone(e) {
    console.log(e.target)
    if(e.target.classList.contains("delete") || e.target.classList.contains("trash")) return
    e.target.classList.toggle('completed')
}

function addToDo(event) {
    if(!todoInput.value){
        alert("Digite aqui sua To-Do.")
    }
    else{
        const template = `
        <div class="task">
            <span id="taskname">${todoInput.value}</span>
            <button class="delete">
                <input type="image" class="trash" src="./images/trash.svg"></input>
            </button>
        </div>
    `
        tasks.push({ value: todoInput.value})
        console.log(tasks)
        let tasksHtml = document.querySelector("#tasks")
        tasksHtml.innerHTML += template
        todoInput.value = "";
        localStorage.setItem("tasks",JSON.stringify(tasks))
        taskElement = document.querySelectorAll('.task')
        console.log(taskElement)
        current_tasks = document.querySelectorAll(".delete");
        taskElement.forEach(task => 
            task.addEventListener('click', (e) => toggleDone(e))    
        )
        current_tasks.forEach(trash => 
            trash.addEventListener('click', (e) => removeToDo(e))
        )
    }
}

submitButton.addEventListener('click', (event) => addToDo(event))
let current_tasks = document.querySelectorAll(".delete");
current_tasks.forEach(trash => 
    trash.addEventListener('click', (e) => removeToDo(e))
)
let taskElement = document.querySelectorAll('.task')
taskElement.forEach(task => 
    task.addEventListener('click', (e) => toggleDone(e))    
)