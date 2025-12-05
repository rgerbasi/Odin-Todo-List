// todos.js
import { format, } from "date-fns"


export class ToDoItem {

    title;
    description;
    dueDate;
    priority;
    notes;
    checklist;

    constructor (properties = {}) {
        this.title = properties.title ?? "";
        this.description = properties.description ?? "";
        this.dueDate = properties.dueDate ?? new Date();
        this.priority = properties.priority;
    }
    

}

export class Project {
    todos = [];

    constructor (properties = {}) {
        this.todos = properties.todos;
    }
}