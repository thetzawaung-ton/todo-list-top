import { projects } from "./project.js";

export default class ToDo {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
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