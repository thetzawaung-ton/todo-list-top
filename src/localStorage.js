import Project, { projects } from "./project.js";
import ToDo from "./toDo.js";

export const setLocalStorage = () => localStorage.setItem("project", JSON.stringify(projects));
export const getLocalStorage = () => JSON.parse(localStorage.getItem("project"));

export const renderFromLocal = () => {
    const localArray = getLocalStorage();

    if (localArray) {
        projects.length = 0;

        const projectWithMethods = localArray.map(projectData => {
            const projectInstance = new Project();
            Object.assign(projectInstance, projectData);

            if (projectInstance.items) {
                projectInstance.items = projectInstance.items.map(todoData => {
                    const todoInstance = new ToDo();
                    Object.assign(todoInstance, todoData);
                    return todoInstance;
                });
            }

            return projectInstance;
        });

        projects.push(...projectWithMethods);
    }
}