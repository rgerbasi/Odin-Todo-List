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
        // this.state.projects.push(new Project({ name: 'Today' }));
        // this.state.currentProject = this.state.projects[0];
        this.state.toBeRemoved = {};
        this.state.toEdit = null;
        // this.addPreemptiveData();
        this.readLocalStorage();
        this.display.renderSidebar(this.state);
        this.display.renderProjectPage(this.display.createProjectPage(this.state.currentProject))
    }
    addPreemptiveData() {
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
            notes: "",
            priority:"high",
            title:"Find thing to do",
        });
    }

    changeCurrentProject(newProject) {
        this.state.currentProject = newProject;
        // this.display.renderProject(this.state);
    }
    getProject(projectName) { 
        return this.state.projects.find( (obj) => obj.name === projectName );
    }
    createProject(projectName) {
        let newProject = new Project({ name: projectName});
        this.state.projects.push(newProject);
        this.updateLocalStorage();

        this.changeCurrentProject(newProject);
        this.display.renderSidebar(this.state);
    }
    addTaskToCurrentProject(taskObject) {
        this.state.currentProject.addTask(new Task(taskObject));
        this.updateLocalStorage();
    }
    removeProject(project) {
        //if empty do nothign
        if (!this.state.projects.length) return;

        let index = this.state.projects.findIndex( (item) => item === this.state.toBeRemoved);
        if (index === -1) return;
        //remove project
        this.state.projects.splice(index,1);
        this.updateLocalStorage();
        this.display.renderSidebar(this.state);
    }
    updateLocalStorage() {
        if (this.state.projects.length === 0) {
            localStorage.clear();
            return;
        }
        localStorage.setItem('projects', JSON.stringify(this.state.projects));
    }
    readLocalStorage() {
        let storage = localStorage.getItem('projects');

        if (!storage) {
            this.state.projects.push(new Project({ name: 'Today' }));
            this.state.currentProject = this.state.projects[0];
            return;
        }
        
        for (let storedProject of JSON.parse(storage)) {
            let project = new Project({ name: storedProject.name });
            for (let storedTask of storedProject.tasks) {
          
                project.addTask(new Task(storedTask));
            }
            this.state.projects.push(project);
        }
        this.state.currentProject = this.state.projects[0];
        // console.dir(JSON.parse(storage));
    }
    
}

const app = new App();
app.init();