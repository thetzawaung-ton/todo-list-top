import toDo, { toDoList }  from "./toDo.js";

export const createToDo = (title, description, dueDate, priority) => {
    const newToDo = new toDo(title, description, dueDate, priority);
    toDoList.push(newToDo);
    return newToDo;
};

export const deleteToDo = (id) => {
    const index = toDoList.findIndex(list => list.id === id);

    if( index > -1) {
        toDoList.splice(index, 1);
    }
}

export const updateToDo = (id, title, description, dueDate, priority) => {
    const targetItem = toDoList.find(list => list.id === id);

    targetItem.title = title;
    targetItem.description = description;
    targetItem.dueDate = dueDate;
    targetItem.priority = priority;
}