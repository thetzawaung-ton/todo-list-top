import { setLocalStorage } from "./localStorage.js";
import { projects } from "./project.js";

export default class ToDo {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

ToDo.prototype.toggleComplete = function() {
    this.completed = (this.completed === false) ? true : false;
    console.log("task done is " + this.completed);
}

export const createToDo = (title, description,dueDate, priority, projectId) => {
    const newToDo = new ToDo (title, description, dueDate, priority);
    const targetProject = projects.find(project => project.id === projectId);
    if(targetProject) {
        targetProject.items.push(newToDo);
    } else {
        console.log("cannot find project");
    }
    return newToDo;
}

ToDo.prototype.updateToDo = function (newTitle, newDescription, newDuedate, newPriority) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDuedate;
    this.priority = newPriority;
}