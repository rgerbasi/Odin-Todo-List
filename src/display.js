//display.js

export class Display {
    //fields
    DOM = {};
    templates = {};
    projectDOMs = {};
    app;

    constructor (app) {
        this.cacheDOM();
        this.addInitialEventListeners();
        this.app = app;
    }

    //methods
    addInitialEventListeners() {
        this.DOM.newProjectButton.addEventListener('click' , this.handleNewProjectClicked);
        this.attachNewProjectDialogListeners();
    }
    attachNewProjectDialogListeners() {
        this.DOM.newProjectDialogBackButton.addEventListener('click', this.handleClose);
        this.DOM.newProjectDialog.addEventListener('click', this.handleClose);
    }
    attachFormListeners() {

    }
    attachConfirmDialogListeners() {

    }
    renderSidebar(state) {
        state.projects.map( (project) => {
            let button = document.createElement('button');
            button.textContent = project.getName();
            button.setAttribute('data-project', project.getName());
            this.DOM.projectList.appendChild(button);
        });
    }
    createProjectPage(project) {
        let currentProjectDOM = document.importNode(this.templates.projectTemplate.content,true);
        let projectName = currentProjectDOM.querySelector('.project-title');
        projectName.textContent = project.getName();

        this.projectDOMs[project.getName()] = currentProjectDOM;
        return currentProjectDOM;
    }
    renderProjectPage(projectDOM) {
        console.log(projectDOM)
        console.log(this.DOM.projectContent.hasChildNodes())
        if (this.DOM.projectContent.hasChildNodes()) {
            
        } else {
            this.DOM.projectContent.appendChild(projectDOM);
        }
    }


    cacheDOM(){
        this.DOM.sidebar = document.querySelector('.sidebar');
        this.DOM.newProjectButton = document.querySelector('#new-project-button')
        this.DOM.projectList = document.querySelector('.projects');
        this.DOM.resizeHandle = document.querySelector('.resize-handle');
        this.DOM.projectContent = document.querySelector('.project-content');

        this.templates.projectTemplate = document.querySelector('#project-template');
        this.templates.taskTemplate = document.querySelector('#task-template');
        this.templates.checklistTemplate = document.querySelector('#checklist-item-template');

        this.DOM.newProjectDialog = document.querySelector('#new-project-dialog');
        this.DOM.newProjectDialogTitle = document.querySelector('#new-project-h1');
        this.DOM.newProjectDialogInput = document.querySelector('#new-project');
        this.DOM.newProjectDialogBackButton = document.querySelector('#back-button');
        this.DOM.newProjectDialogCreateButton = document.querySelector('#create-button');

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

    }

    //events 
    handleNewProjectClicked = (event) => {
        this.DOM.newProjectDialogTitle.textContent = 'Create new project';
        //reset input in case
        this.DOM.newProjectDialogInput.value = "";
        this.DOM.newProjectDialog.showModal();
    }
    handeProjectListClicked = (event) => {

    }
    handleClose = (event) => {
        let dialogToClose = event.target.closest('dialog');
      
        console.log(dialogToClose);
        dialogToClose.close();
    }

}