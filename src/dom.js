import { projects, createProject, deleteProject } from "./project.js";
import { format } from "date-fns";
import { createToDo } from "./toDo.js";
import { renderFromLocal, setLocalStorage } from "./localStorage.js";
import { ta } from "date-fns/locale";

const sidebar = document.querySelector(".sidebar");
const allProjectContainer = document.querySelector(".all-project-container");
const main = document.querySelector(".main");
const allTodoContainer = document.querySelector(".all-todo-container");
const addProjectBtn = document.querySelector(".add-project");
const addToDoBtn = document.querySelector(".add-todo");
const dialogElem = document.querySelector(".form-dialog");
const alertDialog = document.querySelector(".alert-dialog");
const warningDialog = document.querySelector(".warning-dialog");

renderFromLocal();
export const getDefaultProject = () => projects.find(project => project.name === "Default Project");

const activeProjectFromLocal = JSON.parse(localStorage.getItem("active-project"));

let activeProject;
if(activeProjectFromLocal) {
    activeProject = findProjectById(activeProjectFromLocal.id);
}
if(!activeProject) {
    activeProject = getDefaultProject();
}
export const getActiveProject = () => activeProject;

function findProjectById(projectId) {
    return projects.find(project => project.id == projectId);
}

export function showProjects() {
    allProjectContainer.textContent = "";
    projects.forEach(project => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project");
        projectContainer.setAttribute("data-project-id", project.id)
        const projectName = document.createElement("span");
        projectName.textContent = project.name;
        const projectDeleteBtn = document.createElement("button");
        projectDeleteBtn.classList.add("delete-project");
        projectDeleteBtn.textContent = "x";
        projectContainer.append(projectName, projectDeleteBtn);
        allProjectContainer.appendChild(projectContainer);
    })
}

export function showToDos() {
    allTodoContainer.textContent = "";
    activeProject.items.forEach(toDo => {
        const toDoContainer = document.createElement("div");
        toDoContainer.classList.add("todo");
        toDoContainer.setAttribute("data-todo-id", toDo.id);
        const toDoTitle = document.createElement("h3");
        toDoTitle.textContent = "Title: " + toDo.title;
        const toDoDueDate = document.createElement("h3");
        toDoDueDate.textContent = "Due Date: " + format(toDo.dueDate, "dd,MM,yyyy");
        const updateToDoBtn = document.createElement("button");
        updateToDoBtn.classList.add("update-todo");
        updateToDoBtn.textContent = "Edit";
        const deleteToDoBtn = document.createElement("button");
        deleteToDoBtn.classList.add("delete-todo");
        deleteToDoBtn.textContent = "Delete";
        toDoContainer.append(toDoTitle, toDoDueDate, updateToDoBtn, deleteToDoBtn);
        allTodoContainer.appendChild(toDoContainer);
    })
}

allProjectContainer.addEventListener("click", function(event) {

    if( event.target.classList.contains("delete-project")) {
        const projectId = event.target.closest(".project").getAttribute("data-project-id");
        const targetProject = findProjectById(projectId);
        if(targetProject == getDefaultProject()) {
            showAlert("Default project can not be deleted");
        }
        else if(targetProject != getDefaultProject()) {
            showWarning(`Are you sure to delete project ${targetProject.name}`);
            warningDialog.setAttribute("project-id", targetProject.id);
        }
        return
    }

    const projectId = (event.target.closest(".project").getAttribute("data-project-id"));
    const targetProject = findProjectById(projectId);
    activeProject = targetProject;
    localStorage.setItem("active-project", JSON.stringify(targetProject));
    showToDos();
    
})

function showWarning(message) {
        warningDialog.showModal();
        const warningMessage = document.querySelector(".warning-message");
        warningMessage.textContent = message;
}

const warningComfirmBtn = document.querySelector(".comfirm");
const warningCancelBtn = document.querySelector(".cancel");

warningCancelBtn.addEventListener("click", function() {
    warningDialog.removeAttribute("project-id");
    warningDialog.close();
})

warningComfirmBtn.addEventListener("click", function() {
    const targetProject = findProjectById(warningDialog.getAttribute("project-id"));
    targetProject.deleteProject();
    setLocalStorage();
    activeProject = getDefaultProject();
    localStorage.setItem("active-project", JSON.stringify(activeProject));
    warningDialog.removeAttribute("project-id");
    warningDialog.close();
    showProjects();
    showToDos();
})

addProjectBtn.addEventListener("click", function() {
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.autofocus = true;
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Add";
    label.textContent = "Enter project name";
    form.append(label, input, submitBtn);
    sidebar.insertBefore(form, allProjectContainer);
    addProjectBtn.disabled = true;
    addToDoBtn.disabled = true;
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if(projects.find(project=> project.name === input.value)) {
            showAlert("The project name can not be the same");
        }
        else {const name = input.value;
        createProject(name);
        setLocalStorage();
        showProjects();
        sidebar.removeChild(form);
        addProjectBtn.disabled = false;
        addToDoBtn.disabled = false;
        }
    })
})

function showAlert(message) {
    alertDialog.showModal();
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.textContent = message;
}

const closeAlertBtn = document.querySelector(".alert-close");
closeAlertBtn.addEventListener("click", function() {
    alertDialog.close();
})

addToDoBtn.addEventListener("click", function() {
    dialogElem.showModal();
    dialogForm.setAttribute("form-mode", "add");
})

const closeDialogBtn = document.querySelector(".close-dialog");
const dialogForm = document.querySelector(".dialog-form")
closeDialogBtn.addEventListener("click", function(event) {
    event.preventDefault();
    dialogForm.reset();
    dialogElem.close();
})


const dueDate = document.querySelector("#due_date");
dueDate.min = new Date().toISOString().split("T")[0];

dialogForm.addEventListener("submit", function(event) {
    const formTitle = document.querySelector("#title").value;
    const formDescription = document.querySelector("#description").value;
    const formDueDate = document.querySelector("#due_date").valueAsDate;
    const formPriority = document.querySelector("#priority").value;
    const mode = dialogForm.getAttribute("form-mode");

    if(mode === "add") {
        createToDo(formTitle, formDescription, formDueDate, formPriority, activeProject.id);
        setLocalStorage();
        activeProject = findProjectById(activeProject.id);
        localStorage.setItem("active-project", JSON.stringify(activeProject));
        dialogForm.removeAttribute("form-mode");
    }
    if(mode === "edit") {
        const toDoId = event.target.closest("form").getAttribute("data-todo-id");
        const targetToDo = activeProject.items.find(toDo => toDo.id == toDoId);
        targetToDo.updateToDo(formTitle, formDescription, formDueDate, formPriority);
        setLocalStorage();
        activeProject = findProjectById(activeProject.id);
        localStorage.setItem("active-project", JSON.stringify(activeProject));
        dialogForm.removeAttribute("form-mode");
        dialogForm.removeAttribute("data-todo-id");
    }
    event.preventDefault();
    dialogForm.reset();
    dialogElem.close();
    showToDos();
})

allTodoContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("delete-todo")) {
        const toDoId = event.target.closest(".todo").getAttribute("data-todo-id");
        activeProject.deleteToDo(toDoId);
        setLocalStorage();
        activeProject = findProjectById(activeProject.id);
        localStorage.setItem("active-project", JSON.stringify(activeProject));
        showToDos();
    }
    if(event.target.classList.contains("update-todo")) {
        dialogElem.showModal();
        dialogForm.setAttribute("form-mode", "edit");
        const toDoId = event.target.closest(".todo").getAttribute("data-todo-id");
        const targetToDo = activeProject.items.find(toDo => toDo.id == toDoId);
        dialogForm.setAttribute("data-todo-id", toDoId);
        document.querySelector("#title").value = targetToDo.title;
        document.querySelector("#description").value = targetToDo.description;
        const dateObj = new Date(targetToDo.dueDate);
        document.querySelector("#due_date").valueAsDate = dateObj;
        document.querySelector("#priority").value = targetToDo.priority;
    }
})