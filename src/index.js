import "./styles.css";
import { getToDoList } from "./toDo.js";
import { createToDo, deleteToDo } from "./toDoActions.js";
console.log("Hello");
console.log(getToDoList());

let newToDo = createToDo("one", "two", "three", "four");
console.log(getToDoList());

let toDo2 = createToDo("two", "four", "six", "eight");
console.log(getToDoList());

deleteToDo(toDo2.id);
console.log(getToDoList());