import "./styles.css";
import { getToDoList } from "./toDo.js";
import { createToDo, deleteToDo, updateToDo } from "./toDoActions.js";
console.log("Hello");
console.log(getToDoList());

let newToDo = createToDo("one", "two", "three", "four");
console.log(getToDoList());

let toDo2 = createToDo("two", "four", "six", "eight");
console.log(getToDoList());

let toDo1 = createToDo("ok", "ok", "ok", "ok");
console.log(getToDoList());

deleteToDo(toDo2.id);
console.log(getToDoList());

updateToDo(toDo1.id, "one", "one", "one", "one");
console.log(getToDoList());