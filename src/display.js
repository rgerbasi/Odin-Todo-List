//display.js
import { 
    Task, Project 
} from "./todos.js";

export class Display {
    //fields
    DOM = {};


    constructor (properties = {}) {
        this.cacheDOM();
    }

    //methods
    cacheDOM(){
        this.DOM.sidebar = document.querySelector('.sidebar');
        this.DOM.resizeHandle = document.querySelector('.resize-handle');
        this.DOM.content = document.querySelector('.content');

        this.DOM.projectTemplate = document.querySelector('#project-template');
        this.DOM.taskTemplate = document.querySelector('#task-template');

        console.log(this.DOM);
    }

}