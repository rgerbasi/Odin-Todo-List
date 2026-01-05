//display.js

export class Display {
    //fields
    DOM = {};
    templates = {};
    app;

    constructor (app) {
        this.cacheDOM();
        this.addInitialEventListeners();
        this.app = app;
    }

    //methods
    addInitialEventListeners() {
        this.DOM.newProjectButton.addEventListener('click' , this.handleOpenNewProjectDialog);
        this.DOM.projectList.addEventListener('click', this.handeProjectListClicked);
        this.attachNewProjectDialogListeners();
        this.attachTaskFormListeners();
    }
    attachNewProjectDialogListeners() {
        this.DOM.newProjectDialogBackButton.addEventListener('click', this.handleClose);
        this.DOM.newProjectDialogCreateButton.addEventListener('click', this.handleCreateProject);
        this.DOM.newProjectDialog.addEventListener('click', (event) => {
            if (event.target === this.DOM.newProjectDialog) this.handleClose(event);
        });
    }
    attachTaskFormListeners() {
        this.DOM.form.formNode.addEventListener('submit', this.handleNewTaskSubmitted);
        this.DOM.form.addToChecklistButton.addEventListener('click', this.handleAddToChecklist);
        this.DOM.form.closeButton.addEventListener('click', this.handleClose);
        this.DOM.form.xButton.addEventListener('click', this.handleClose);
        this.DOM.taskFormDialog.addEventListener('click', (event)=> {
            if (event.target === this.DOM.taskFormDialog) this.handleClose(event);
        });
    }
    attachConfirmDialogListeners() {

    }
    renderSidebar(state) {
        this.DOM.projectList.textContent = "";
        state.projects.map( (project) => {
            let button = document.createElement('button');
            button.textContent = project.getName();
            button.setAttribute('data-project', project.getName());
            this.DOM.projectList.appendChild(button);
        });
    }
    //project pages
    createProjectPage(project) {
        let currentProjectDOM = document.importNode(this.templates.projectTemplate.content,true);
        let projectName = currentProjectDOM.querySelector('.project-title');
        projectName.textContent = project.getName();

        //attach tasks
        this.attachEventListenersToProjectPage(currentProjectDOM);
        return currentProjectDOM;
    }
    attachEventListenersToProjectPage(projectDOM) {
        let addTaskButton = projectDOM.querySelector('.new-task-button');
        addTaskButton.addEventListener('click', this.handleOpenNewTaskDialog);
        let removeProjectButton = projectDOM.querySelector('.remove-project-button');
        removeProjectButton.addEventListener('click', this.handleRemoveProject);
    }
    renderProjectPage(projectDOM) {
        this.DOM.projectContent.textContent = "";
        this.DOM.projectContent.appendChild(projectDOM);
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

        this.DOM.taskFormDialog = document.querySelector('#task-form-dialog');
        this.DOM.confirmDialog = document.querySelector('#confirm-dialog');
        this.DOM.confirmDialogTitle = document.querySelector('#confirm-object');
        this.DOM.confirmDialogNoButton = document.querySelector('#no');
        this.DOM.confirmDialogYesButton = document.querySelector('#yes');

        this.DOM.form = {};
        this.DOM.form.formNode = document.querySelector('#task-form-dialog form')
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
    handeProjectListClicked = (event) => {
        let project = this.app.getProject(event.target.dataset.project);
        if (project) {
            this.renderProjectPage(this.createProjectPage(project))
        }
    }
    handleCreateProject = (event) => {
        this.app.createProject(this.DOM.newProjectDialogInput.value);
        this.handleClose(event);
    }
    handleAddToChecklist = (event) => {
        let checklistItemText = this.DOM.form.checklistInput.value;
        if (!checklistItemText) return;
     
        let checklistItemDOM = document.importNode(this.templates.checklistTemplate.content, true);
        //populating Template
        checklistItemDOM.querySelector('.checklist-content').textContent = checklistItemText;
        //attaching remove checklist item listener to template
        checklistItemDOM.querySelector('button').addEventListener('click', (event) => {
            event.target.closest('.checklist-item').remove();
        });
        this.DOM.form.checklistContent.appendChild(checklistItemDOM);
        this.DOM.form.checklistInput.value = "";
    }
    handleOpenNewProjectDialog = (event) => {
        this.DOM.newProjectDialogTitle.textContent = 'Create new project';
        //reset input in case
        this.DOM.newProjectDialogInput.value = "";
        this.DOM.newProjectDialog.showModal();
    }
    handleOpenNewTaskDialog = (event) => {
        this.DOM.taskFormDialog.showModal();
    }
    handleRemoveProject = (event) => {
        console.log("beep removed");
    }
 
    handleClose = (event) => {
        let dialogToClose = event.target.closest('dialog');
        // console.log(dialogToClose);

        dialogToClose.close();
    }

    handleNewTaskSubmitted = (event) => {
        event.preventDefault();
        console.log('submitted');
    }

}