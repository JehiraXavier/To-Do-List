let task_form = document.getElementById("task_form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let description = document.getElementById("description");
let warning = document.getElementById("warning");
let addedTasks = document.getElementById("addedTasks");
let newTask = document.getElementById("newTask");

task_form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (titleInput.value === "") {
    console.log("Failure");
    warning.innerHTML = "Please enter task title";
  } else {
    console.log("Success");
    warning.innerHTML = "";
    acceptData();
    newTask.setAttribute("data-bs-dismiss", "modal");
    newTask.click();

    (() => {
      newTask.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let taskData = [{}];

let acceptData = () => {
  taskData.push({
    taskTitle: titleInput.value,
    date: dateInput.value,
    description: description.value,
  });

  localStorage.setItem("taskData", JSON.stringify(taskData));

  console.log(taskData);
  createTasks();
};

let createTasks = () => {
  addedTasks.innerHTML = "";
  taskData.map((x, y) => {
    return (addedTasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold fs-4">${x.taskTitle}</span>
          <span class="text-dark fs-5">${x.date}</span>
          <p class="fs-6 font-weight-normal lh-base">${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#task_form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  // e.parentElement.parentElement.remove();  //Will delete the HTML element from the screen
  taskData.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("taskData", JSON.stringify(taskData));
  console.log(taskData);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  titleInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  description.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  titleInput.value = "";
  dateInput.value = "";
  description.value = "";
};

(() => {
  taskData = JSON.parse(localStorage.getItem("taskData")) || []
  console.log(taskData);
  createTasks();
})();
