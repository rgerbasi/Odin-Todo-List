// todos.js
import { format, } from "date-fns"


export class Task {
    //fields
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
    //methods

}

export class Project {
    name;
    tasks = [];

    constructor (properties = {}) {
        this.name = properties.name ?? "Empty";
    }
    //methods
    getName() { return this.name; }
    setName(newName) { this.name = newName; }
}