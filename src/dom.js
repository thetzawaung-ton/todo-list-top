import { projects, defaultProject, deleteProject, createProject } from "./project.js";
import { format } from "date-fns";
import { createToDo } from "./toDo.js";

const sidebar = document.querySelector(".sidebar");
const allProjectContainer = document.querySelector(".all-project-container");
const main = document.querySelector(".main");
const allTodoContainer = document.querySelector(".all-todo-container");
const addProjectBtn = document.querySelector(".add-project");
const addToDoBtn = document.querySelector(".add-todo");
const dialogElem = document.querySelector("dialog");
let activeProject = findProjectById(defaultProject.id)

function findProjectById(projectId) {
    return projects.find(project => project.id === projectId);
}

export const showProjects = () => {
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

export const showToDos = () => {
    allTodoContainer.textContent = "";
    activeProject.items.forEach(toDo => {
        const toDoContainer = document.createElement("div");
        const toDoTitle = document.createElement("h3");
        toDoTitle.textContent = "Title: " + toDo.title;
        const toDoDueDate = document.createElement("h3");
        toDoDueDate.textContent = "Due Date: " + format(toDo.dueDate, "dd,MM,yyyy");
        const updateToDoBtn = document.createElement("button");
        updateToDoBtn.textContent = "Edit";
        const deleteToDoBtn = document.createElement("button");
        deleteToDoBtn.textContent = "Delete";
        toDoContainer.append(toDoTitle, toDoDueDate, updateToDoBtn, deleteToDoBtn);
        allTodoContainer.appendChild(toDoContainer);
    })
}

allProjectContainer.addEventListener("click", function(event) {

    if( event.target.classList.contains("delete-project")) {
        const projectId = event.target.closest(".project").getAttribute("data-project-id");
        console.log(projectId);
        const targetProject = findProjectById(projectId);
        console.log(targetProject);
        if(targetProject != defaultProject) {
            const confirmDelete = confirm(`Are you sure to delete project ${targetProject.name}`);
            if(confirmDelete) {
                targetProject.deleteProject();
                activeProject = defaultProject;
                showProjects();
                showToDos();
            }
        }
        return
    }

    const projectId = (event.target.closest(".project").getAttribute("data-project-id"));
    console.log(projectId);
    const targetProject = findProjectById(projectId);
    console.log(targetProject);
    activeProject = targetProject;
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
        const name = input.value;
        createProject(name);
        showProjects();
        event.preventDefault();
        sidebar.removeChild(form);
        addProjectBtn.disabled = false;
        addToDoBtn.disabled = false;
    })
})

addToDoBtn.addEventListener("click", function() {
    dialogElem.showModal();
})

const closeDialogBtn = document.querySelector(".close-dialog");
const dialogForm = document.querySelector(".dialog-form")
closeDialogBtn.addEventListener("click", function(event) {
    event.preventDefault();
    dialogForm.reset();
    dialogElem.close();
})

dialogForm.addEventListener("submit", function() {
    const formTitle = document.querySelector("#title").value;
    const formDescription = document.querySelector("#description").value;
    const formDueDate = document.querySelector("#due_date").valueAsDate;
    const formPriority = document.querySelector("#priority").value;

    createToDo(formTitle, formDescription, formDueDate, formPriority, activeProject.id);
    dialogForm.reset();
    showToDos();
})