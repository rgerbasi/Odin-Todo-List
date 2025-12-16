// src/index.js
import "./styles.css";

import { Display } from "./display.js";
import { 
    Task, Project 
} from "./todos.js";


class App {
    state = {};
    display;

    constructor(){
        this.display = new Display();

    }
    init(){
        this.state.projects = [];
        this.state.projects.push(new Project({ name: 'Today' }));
        this.state.currentProject = this.state.projects[0];
        this.display.renderSidebar(this.state);
        this.display.renderProject(this.state.currentProject);
    }

}

const app = new App();
app.init();