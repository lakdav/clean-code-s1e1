//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementById("add-task");//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString,cls){

  var listItem=document.createElement("li");
  listItem.className=cls
    //input (checkbox)
  var task=document.createElement("div");
  task.className="task"
      //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  checkBox.className="task__checkbox"
  checkBox.type="checkbox";
    //label
  var label=document.createElement("label");//label
  label.className="task__label"
    //input (text)
  var editInput=document.createElement("input");//text
  editInput.className="task__input task__input_hidden text-input"
  editInput.type="text";
    //button.edit
  var editButton=document.createElement("button");//edit button
  editButton.className="btn btn_theme_edit"
  editButton.innerText="Edit";
    //button.delete
  var deleteButton=document.createElement("button");//delete button
  deleteButton.className="btn btn_theme_delete"
  var deleteButtonImg=document.createElement("img");//delete button image
  deleteButtonImg.className="btn__img"
  deleteButtonImg.src='./remove.svg';

  label.innerText=taskString;

  deleteButton.appendChild(deleteButtonImg);
    //and appending.
  task.appendChild(checkBox);
  task.appendChild(label);
  task.appendChild(editInput);
  task.appendChild(editButton);
  task.appendChild(deleteButton);
  listItem.appendChild(task)
return listItem;
}

var addTask=function(){
  console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value,"incomplete-tasks__item");

    //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem=this.closest("li");
  var editInput=listItem.querySelector('.task__input');
  var label=listItem.querySelector(".task__label");
  var editBtn=listItem.querySelector(".btn_theme_edit");
  var isEditMode=listItem.hasAttribute('data-editMode');

    //If class of the parent is .editmode
  if(isEditMode){
        //switch to .editmode
        //label becomes the inputs value.
    label.textContent=editInput.value;
    editBtn.innerText="Edit";
    editInput.classList.add("task__input_hidden")
    label.classList.remove("task__label_hidden")
    listItem.removeAttribute("data-editMode",true)
  }else{
    editInput.value=label.textContent
    editBtn.innerText="Save";
    editInput.classList.remove("task__input_hidden")
    label.classList.add("task__label_hidden")
    listItem.setAttribute("data-editMode",true)
  }
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.closest("li");
  var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
  var listItem=this.closest("li");
  listItem.querySelector(".task__label").classList.add("task__label_completed")
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
  var listItem=this.closest("li")
  listItem.querySelector(".task__label").classList.remove("task__label_completed")
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".task__checkbox");
    var editButton=taskListItem.querySelector(".btn_theme_edit");
    var deleteButton=taskListItem.querySelector(".btn_theme_delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.