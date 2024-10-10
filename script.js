const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask(){
    const task = taskInput.value.trim();
    //taskInput.value=gets the value of the input field in our html file
    //trim function doesnt take blankspaces as input

    if (task){
        createTaskElement(task);

        taskInput.value = '';

        saveTasks()

    }else{
        alert('Please enter a task!')
        // if task is empty
    }
}

addButton.addEventListener('click',addTask)


function createTaskElement(task){
    const listItem =document.createElement('li');

    listItem.textContent = task;
    // the task we got from addTask will be added here

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTask';

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener('click', function(){
        taskList.removeChild(listItem);
        saveTasks();
    });
    
}

function saveTasks(){
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item){
        /*item is each individual li element we are getting
         from the query selector and then push into the array*/

         tasks.push(item.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
    //set items to task and turn array to a json format
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //reconvert json object to an array

    tasks.forEach(createTaskElement);
}