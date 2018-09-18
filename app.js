 // Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
  //DOM  Load Event 
  document.addEventListener('DOMContentLoaded', getTasks);
 //Add task event
 form.addEventListener('submit', addTask);
 // Remove task event
  taskList.addEventListener('click', removeTask);
 //Clear task event
 clearBtn.addEventListener('click', clearTasks);
 //Filter task event
 filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 

  tasks.forEach(function(task){
    // Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create Text Node And Append to Li Element
    li.appendChild(document.createTextNode(task));
    //Create a new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content'
    // Add html icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to Li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
 if(taskInput.value === '') {
    alert('Add a Task');
 }

 // Create li Element
const li = document.createElement('li');
//Add class
 li.className = 'collection-item';
 //Create Text Node And Append to Li Element
 li.appendChild(document.createTextNode(taskInput.value));
 //Create a new link element
 const link = document.createElement('a');
 //Add Class
 link.className = 'delete-item secondary-content'
 // Add html icon
 link.innerHTML = '<i class="fa fa-remove"></i>';
//Append the link to Li
 li.appendChild(link);

 //Append li to ul
taskList.appendChild(li);

//Store in LS
storeTaskInLocalStorage(taskInput.value); 

//Clear Tasks
taskInput.value = '';

e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks)); 
}

//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains
  ('delete-item')) 
  {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

        //Remove Tasks from LS
      removeTaskFromLocalStorage
      (e.target.parentElement.parentElement);
    }
  }   
   
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
     tasks.splice(index, 1);  
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Clear Tasks
function clearTasks() {
//  taskList.innerHTML = '';
//or Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }


  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    } 
  });
}
