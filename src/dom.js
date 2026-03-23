import { projects, defaultProject } from "./project.js";

const sidebar = document.querySelector(".sidebar");
const allProjectContainer = document.querySelector(".all-project-container");
const main = document.querySelector(".main");
let activeProject = projects.find(project => project.id === defaultProject.id);

export const showProjects = () => {
    projects.forEach(project => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project");
        projectContainer.setAttribute("data-project-id", project.id)
        const projectName = document.createElement("span");
        projectName.setAttribute("data-project-id", project.id)
        projectName.textContent = project.name;
        const projectDeleteBtn = document.createElement("button");
        projectDeleteBtn.textContent = "x";
        projectContainer.append(projectName, projectDeleteBtn);
        allProjectContainer.appendChild(projectContainer);
    })
}

export const showToDos = () => {
    main.textContent = "";
    activeProject.items.forEach(toDo => {
        const toDoContainer = document.createElement("div");
        const toDoTitle = document.createElement("h3");
        toDoTitle.textContent = toDo.title;
        toDoContainer.appendChild(toDoTitle);
        main.appendChild(toDoContainer);
    })
}

allProjectContainer.addEventListener("click", function(event) {
    const projectId = (event.target.getAttribute("data-project-id"));
    console.log(projectId);
    const targetProject = projects.find(project => project.id === projectId);
    console.log(targetProject);
    activeProject = targetProject;
    showToDos();
})