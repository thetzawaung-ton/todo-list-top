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