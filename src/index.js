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
        this.display = new Display(this);
    }
    init(){
        this.state.projects = [];
        this.state.projects.push(new Project({ name: 'Today' }));
        this.state.currentProject = this.state.projects[0];
        this.display.renderSidebar(this.state);
        this.display.renderProjectPage(this.display.createProjectPage(this.state.currentProject))
    }

    changeCurrentProject(newProject) {
        this.state.currentProject = newProject;
        // this.display.renderProject(this.state);
    }
    createProject(projectName) {
        this.state.projects.push(new Project({ name: projectName}));
        this.display.renderSidebar(this.state);
    }
}

const app = new App();
app.init();