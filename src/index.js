// src/index.js
import "./styles.css";

import { Display } from "./display.js";
import { 
    Task, Project 
} from "./todos.js";


class App {
    state = {};
    //state so far: currentProject, projects
    display;

    constructor(){
        this.display = new Display(this);
    }
    init(){
        this.state.projects = [];
        this.state.projects.push(new Project({ name: 'Today' }));
        this.state.currentProject = this.state.projects[0];
        this.addTaskToCurrentProject({
            checklist: ['1', '2', '3 Things'],
            description: "Preemptive Data",
            dueDate: "2000-01-01T16:20",
            notes: "Note note note",
            priority:"high",
            title:"Be born",
        });
        this.addTaskToCurrentProject({
            checklist: ['4', '5', '6 Things'],
            description: "Preemptive Data",
            dueDate: "2000-01-01T16:20",
            notes: "Note note note",
            priority:"high",
            title:"Find thing to do",
        });
        this.display.renderSidebar(this.state);
        this.display.renderProjectPage(this.display.createProjectPage(this.state.currentProject))
        //add task 
        
    }

    changeCurrentProject(newProject) {
        this.state.currentProject = newProject;
        // this.display.renderProject(this.state);
    }
    getProject(projectName) { 
        return this.state.projects.find( (obj) => obj.name === projectName );
    }
    createProject(projectName) {
        this.state.projects.push(new Project({ name: projectName}));
        this.display.renderSidebar(this.state);
    }
    addTaskToCurrentProject(taskObject) {
        this.state.currentProject.addTask(new Task(taskObject));
        // console.log(this.state.currentProject.getTasks());
    }
}

const app = new App();
app.init();