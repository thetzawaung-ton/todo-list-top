import "./styles.css";
import Project, { createProject, getAllProjects, deleteProject, deleteToDo, defaultProject } from "./project.js";
import ToDo, { createToDo } from "./toDo.js";
import { showProjects, showToDos } from "./dom.js";
import { getLocalStorage, renderFromLocal, setLocalStorage } from "./localStorage.js";

renderFromLocal();
showProjects();
showToDos();
