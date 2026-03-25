import { projects, defaultProject, deleteProject, createProject } from "./project.js";

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
        toDoTitle.textContent = toDo.title;
        toDoContainer.appendChild(toDoTitle);
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
            targetProject.deleteProject();
            activeProject = defaultProject;
            showProjects();
            showToDos();
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
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Add";
    label.textContent = "Enter project name";
    form.append(label, input, submitBtn);
    sidebar.insertBefore(form, allProjectContainer);
    
    form.addEventListener("submit", function(event) {
        const name = input.value;
        createProject(name);
        showProjects();
        event.preventDefault();
        sidebar.removeChild(form);
    })
})

addToDoBtn.addEventListener("click", function() {
    dialogElem.showModal();
})