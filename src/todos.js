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
        this.priority = properties.priority ?? "";
        this.notes = properties.notes ?? "";
        this.checklist = properties.checklist ?? [];
    }
    //methods
    getDetails() {
        let result= {};
        for (let [key, val] of Object.entries(this)){
            //dont want to send back an empty array saying there is a value;
            if (val && val.length) {
                if (key === "dueDate") {
                    val = format(val, 'PPp')
                }
                result[key] = val;
            }
        }
        return result;
    }
    getTitle() { return this.title; }

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
    getTasks() {return this.tasks; }
    addTask(task) { this.tasks.push(task); }
    removeTask (taskTitleToRemove) {
        let index = this.tasks.findIndex( (task) => task.getTitle() === taskTitleToRemove);
        if (index === -1) return; 
        // this.tasks.splice(index,1)
        console.dir(this.tasks[index])
    }
}