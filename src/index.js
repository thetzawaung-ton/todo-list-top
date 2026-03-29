import "./styles.css";
import Project, { createProject, getAllProjects, deleteProject, deleteToDo, defaultProject } from "./project.js";
import ToDo, { createToDo } from "./toDo.js";
import { showProjects, showToDos } from "./dom.js";

const proj1 = createProject("one");
const proj2 = createProject("two");
console.log(getAllProjects());
const proj3 = createProject("three");
showProjects();
const todo4 = createToDo("test", "test", new Date("2026-04-01"), "Medium", defaultProject.id);
const todo5 = createToDo("test", "test", new Date("2026-04-02"), "High", defaultProject.id);
showToDos();
