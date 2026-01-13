//display.js

import { Project, Task } from "./todos";

export class Display {
    //fields
    DOM = {};
    templates = {};
    handlers = {};
    app;

    constructor (app) {
        this.cacheDOM();
        this.addInitialEventListeners();
        this.app = app;
    }

    //methods
    addInitialEventListeners() {
        // listeners for elements that dont change from initial load
        this.DOM.newProjectButton.addEventListener('click' , this.handleOpenNewProjectDialog);
        this.DOM.projectList.addEventListener('click', this.handleProjectListClicked);
        this.attachNewProjectDialogListeners();
        this.attachTaskFormListeners();
        this.attachConfirmDialogListeners();
        // handlers for type of button for tasks
        this.handlers = {
            'collapsible': this.handleCollapsibleClicked,
            'edit': this.handleEditClicked,
            'delete': this.handleDeleteTaskClicked
        }
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
        this.DOM.form.taskTitle.addEventListener('input', this.handleTitleInputChange);
        this.DOM.form.addToChecklistButton.addEventListener('click', this.handleAddToChecklist);
        this.DOM.form.closeButton.addEventListener('click', this.handleClose);
        this.DOM.form.xButton.addEventListener('click', this.handleClose);
        this.DOM.taskFormDialog.addEventListener('click', (event)=> {
            if (event.target === this.DOM.taskFormDialog) this.handleClose(event);
        });
    }
    attachConfirmDialogListeners() {    
        this.DOM.confirmDialogNoButton.addEventListener('click', this.handleConfirmNoClicked );
        this.DOM.confirmDialogYesButton.addEventListener('click', this.handleConfirmYesClicked);
        this.DOM.confirmDialog.addEventListener('click', (event) => {
            if (event.target === this.DOM.confirmDialog) this.handleConfirmNoClicked(event);
        })     
    }
    renderSidebar(state) {
        this.DOM.projectList.textContent = "";
        state.projects.forEach( (project) => {
            let button = document.createElement('button');
            button.textContent = project.getName();
            button.setAttribute('data-project', project.getName());
            this.DOM.projectList.appendChild(button);
        });
    }
    //project pages
    createProjectPage(project) {
        let currentProjectDOM = document.importNode(this.templates.projectTemplate.content, true);
        let projectName = currentProjectDOM.querySelector('.project-title');
        projectName.textContent = project.getName();

        let taskListDOM = currentProjectDOM.querySelector('.task-list')
        //for each task render dom and attach
        project.getTasks().forEach( (task) => {
            taskListDOM.appendChild(this.createTaskDOM(task));
        })

        //attach listeners
        this.attachEventListenersToProjectPage(currentProjectDOM, taskListDOM);
        return currentProjectDOM;
    }
    attachEventListenersToProjectPage(projectDOM, taskListDOM) {
        let addTaskButton = projectDOM.querySelector('.new-task-button');
        addTaskButton.addEventListener('click', this.handleOpenNewTaskDialog);
        let removeProjectButton = projectDOM.querySelector('.remove-project-button');
        removeProjectButton.addEventListener('click', this.handleRemoveProject); 
        // task list click delegaator
        taskListDOM.addEventListener('click', this.handleTaskListClickDelegator )
    }
    renderProjectPage(projectDOM) {
        this.DOM.projectContent.textContent = "";
        this.DOM.projectContent.appendChild(projectDOM);
    }
    renderCurrentProjectPage() {
        this.renderProjectPage(this.createProjectPage(this.app.state.currentProject));
    }
    renderEmptyProjectPage() {
        this.DOM.projectContent.textContent = "";
    }
    createTaskDOM(task) {
        let taskDOM = document.importNode(this.templates.taskTemplate.content, true);
        taskDOM.querySelector('.task-name').textContent = task.getTitle();
        taskDOM.querySelector('.task').setAttribute('data-task-name', task.getTitle());
        let taskInfoContainer = taskDOM.querySelector('.task-info-container');
        
   
        for (let [key,val] of Object.entries(task.getDetails())) {
   
            if (key === 'title') continue;
            let taskInfoRow = document.importNode(this.templates.taskInfoTemplate.content,true);

            key = key === "dueDate" ? "Due date" : key;
            taskInfoRow.querySelector('.property-key').textContent = Display.capitalize(key) + ":";
            if (key === 'checklist'){
                 taskInfoRow.querySelector('.property-value').textContent = val;
            } else {
                taskInfoRow.querySelector('.property-value').textContent = Display.capitalize(val);
            }
    
            taskInfoContainer.appendChild(taskInfoRow);
        }
        return taskDOM;
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
        this.templates.taskInfoTemplate = document.querySelector('#task-info');

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
    handleProjectListClicked = (event) => {
        let project = this.app.getProject(event.target.dataset.project);
        //if clicked object has an existing project, change active project in state and render project page
        if (project) {
            this.app.changeCurrentProject(project);
            this.renderCurrentProjectPage();
        }
    }
    handleCreateProject = (event) => {
        //create new project object change it in state and render it upon creation
        this.app.createProject(this.DOM.newProjectDialogInput.value);;
        this.renderCurrentProjectPage();
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
        this.DOM.form.title.textContent = "Add a Task";
        this.DOM.form.formNode.reset();
        this.DOM.form.checklistContent.textContent = "";
        this.DOM.taskFormDialog.showModal();
    }
    handleRemoveProject = (event) => {
        //put the project to be removed on state before modal
        this.app.state.toBeRemoved = this.app.state.currentProject;
        this.DOM.confirmDialogTitle.textContent = 'Are you sure you want to remove the project?'
        this.DOM.confirmDialog.showModal();
    }
 
    handleClose = (event) => {
        let dialogToClose = event.target.closest('dialog');
        //reset State
        this.app.state.toBeRemoved = null;
        this.app.state.toEdit = null;
        dialogToClose.close();
    }

    handleTitleInputChange = (event) => {
        //unique title check
        if (this.app.state.currentProject.getTaskByName(this.DOM.form.taskTitle.value.trim())) {
            this.DOM.form.taskTitle.setCustomValidity('Task titles need to be unique.');
        } else {
            this.DOM.form.taskTitle.setCustomValidity('');
        }
    }
    handleNewTaskSubmitted = (event) => {
        event.preventDefault();
        if (!this.DOM.form.formNode.checkValidity()) {
            this.DOM.form.formNode.reportValidity();
            return;
        }
        const taskData = Object.fromEntries(new FormData(this.DOM.form.formNode));
        let checklistItems = [];
        //loop through checklistContent
        this.DOM.form.checklistContent.querySelectorAll('.checklist-content').forEach( (node) => {
            checklistItems.push(node.textContent.trim());
        })
        taskData.checklist = checklistItems;
        taskData.title = taskData.title.trim();
        
        if (this.app.state.toEdit){
            let task = this.app.state.toEdit;
            task.update(taskData);
        } else {
            this.app.addTaskToCurrentProject(taskData);
        }
   
        //resetting form and closing dialog on submit
        this.DOM.form.formNode.reset();
        this.DOM.form.checklistContent.textContent = "";
        this.DOM.taskFormDialog.close();
        this.renderCurrentProjectPage();
    }

    handleTaskListClickDelegator = (event) => {
        const button = event.target.closest('button');
        if (!button) return;

        const taskDOM = event.target.closest('.task');
        this.handlers[button.dataset.type](event, {
            taskDOM: taskDOM,
        });

    }

    handleCollapsibleClicked = (event, obj) => {
        const taskDOM = obj.taskDOM;

        taskDOM.classList.toggle('active');
        const taskBodyDOM = taskDOM.querySelector('.task-body');

        
        if (taskBodyDOM.style.maxHeight) {
            taskBodyDOM.style.maxHeight = null;
        } else {
            taskBodyDOM.style.maxHeight = taskBodyDOM.scrollHeight + "px"; 
        }
        

    }
    handleEditClicked = (event, obj) => {
        let task = this.app.state.currentProject.getTaskByName(obj.taskDOM.dataset.taskName);
        this.app.state.toEdit = task ; 
        this.DOM.form.title.textContent = "Edit Task";

        //prepopulate form
        this.DOM.form.taskTitle.value = task.getTitle();
        this.DOM.form.dueDate.value = task.getDueDate();
        this.DOM.form.description.value = task.getDescription();
        this.DOM.form.priority.value = task.getPriority();
        this.DOM.form.notes.value =task.getNotes();
        //checklist
        for (let checklistItem of task.getChecklist()){
            this.DOM.form.checklistInput.value = checklistItem;
            this.DOM.form.addToChecklistButton.click();
        }
        // this.DOM.checklistContent
        this.DOM.taskFormDialog.showModal();
    
    }
    handleDeleteTaskClicked = (event, obj) => {
        this.app.state.toBeRemoved = this.app.state.currentProject.getTaskByName(obj.taskDOM.dataset.taskName);
        this.DOM.confirmDialogTitle.textContent = 'Are you sure you want to remove this task?'
        this.DOM.confirmDialog.showModal();

    }


    //confirm dialog methods
    handleConfirmNoClicked = (event) => {
        //reset toBeRemoved and then close
        this.app.state.toBeRemoved = null;
        this.handleClose(event);

    }
    handleConfirmYesClicked = (event) => {
        if (this.app.state.toBeRemoved instanceof Project) {
            //if to be removed is a project remove project data, render different project
            this.app.removeProject(this.app.state.toBeRemoved);
            if (this.app.state.projects.length) {
                this.app.changeCurrentProject(this.app.state.projects[0]);
                this.renderCurrentProjectPage();
            } else {
                this.app.changeCurrentProject(null);
                this.renderEmptyProjectPage();
            }
        } 
        if (this.app.state.toBeRemoved instanceof Task) {
            this.app.state.currentProject.removeTask(this.app.state.toBeRemoved);
            document.querySelector(`[data-task-name="${this.app.state.toBeRemoved.getTitle()}"]`).remove();
        
        }
        this.app.state.toBeRemoved = null;
        this.handleClose(event);
        
    }
    static capitalize(word) {
        if (word == null && typeof word !== "string") return;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}