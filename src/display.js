//display.js
import { 
    Task, Project 
} from "./todos.js";

export class Display {
    //fields
    DOM = {};
    templates = {};
    state = {};

    constructor (properties = {}) {
        this.cacheDOM();
    }

    //methods
    initialLoad() {

    }
    cacheDOM(){
        this.DOM.sidebar = document.querySelector('.sidebar');
        this.DOM.resizeHandle = document.querySelector('.resize-handle');
        this.DOM.content = document.querySelector('.content');

        this.templates.projectTemplate = document.querySelector('#project-template');
        this.templates.taskTemplate = document.querySelector('#task-template');
        this.templates.checklistTemplate = document.querySelector('#checklist-item-template');

        this.DOM.formDialog = document.querySelector('#task-form-dialog');
        this.DOM.confirmDialog = document.querySelector('#confirm-dialog');
        this.DOM.confirmDialogTitle = document.querySelector('#confirm-object');
        this.DOM.confirmDialogNoButton = document.querySelector('#no');
        this.DOM.confirmDialogYesButton = document.querySelector('#yes');

        this.DOM.form = {};
        this.DOM.form.title = document.querySelector('.form-title');
        this.DOM.form.xButton = document.querySelector('#x-button');
        this.DOM.form.taskTitle = document.querySelector('#task-title');
        this.DOM.form.dueDate = document.querySelector('#due-date');
        this.DOM.form.description = document.querySelector('#description');
        this.DOM.form.priority = document.querySelector('#priority');
        this.DOM.form.checklistInput = document.querySelector('#checklist');
        this.DOM.form.addToChecklistButton = document.querySelector('#add-to-checklist');
        this.DOM.form.checklistContent = document.querySelector('.checklist-content');
        this.DOM.form.notes = document.querySelector('#notes');
        this.DOM.form.closeButton = document.querySelector('#close-button');
        this.DOM.form.submitButton = document.querySelector('#submit-button');


        console.log(this.DOM);
        console.log(this.templates);
    }

}