export default class toDo {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export const toDoList = [];

export const getToDoList = () => {
    return toDoList;
}