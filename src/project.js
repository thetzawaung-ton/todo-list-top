import { setLocalStorage } from "./localStorage.js";

export const projects = [];

export default class Project {
    constructor(name){
        this.name = name;
        this.items = [];
        this.id = crypto.randomUUID();
    }
}

export const createProject = (name) => {
    const newProject = new Project(name);
    projects.push(newProject);
    return newProject;
}

export const getAllProjects = () => {
    return projects;
}

Project.prototype.deleteProject = function (){
    projects.splice(projects.indexOf(this), 1);
}

Project.prototype.deleteToDo = function(toDoId) {
    this.items = this.items.filter(toDo => toDo.id !== toDoId);
}

export const defaultProject = createProject("Default Project");