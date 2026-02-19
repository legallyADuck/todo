import "./styles.css";
import { ui, create } from "./domAssets.js";
import { Note, Project, sidebar } from "./data.js";

class EventManager { // NEVER DO THIS AGAIN, this brakes the U pattern, i only need one intance
    constructor(selector, event) {
        this.body = ui.body;
        this.selector = selector;
        this.event = event;
    }

    assignEvent() {
        this.body.addEventListener(this.event, (e) => this.handleEvent(e))
    }

    handleEvent(e) {
        const target = e.target.closest(this.selector) || e.submitter; // returns the element if it has a "[data-click]/[data-enter]" 
        if (!target) return;
        const datasetObject = target.dataset; // we need different dataset key names because of the closest function
        const functionToPerform = Object.values(datasetObject)[0];
        console.log(`function: ${functionToPerform}, action: ${Object.keys(datasetObject)[0]}`)
        
        if (typeof domEvent[functionToPerform] === "function") {
            domEvent[functionToPerform](target, e, this.event); 
        };
    }
}

class Event extends EventManager {
    constructor(selector, event) {
        super(selector, event);
        this.assignEvent();
    }
}

class Form {
    constructor(form) {
        this.name = form.querySelector("#task-name").value;
        this.description = form.querySelector("#description-name").value;
        this.date = form.querySelector("#date").value;
    }
}

const domEvent = {
    close() {
        console.log("closing!")
    }, 

    addProjectTemplate() {
        if (ui.projectsArray.includes(ui.input)) return;
        const input = create.textInput("New task", "enterLogic")
        ui.sidebarProjects.appendChild(input);
        input.focus();
    },

    enterLogic(input, e) {
        if (e.key != "Enter") return;
        if (input.value == "") return;
        input.remove();
        this.createProject(input.value) // create project if enter
    },

    enterInput(input, e) {
        if (e.key != "Enter") return;
        if (input.value == "") return;
        const project = sidebar.currentProject(ui.main.dataset.id)
        
        const noteElement = input.closest(".note-container"); 
        const noteObject = project.currentNote(noteElement.dataset.id); 
        const description = noteElement.querySelector(".description");
        
        description.textContent = input.value;
        noteObject.description = input.value; 

        input.remove()
    },

    tabClick(target) { 
        const project = sidebar.currentProject(target.dataset.id);
        this.displayProject(project);
    },

    createForm(target) {
        target.remove()
        create.form()
    },

    closeForm(target, e) {
        e.preventDefault();
        ui.form.remove();
        create.addTask()
    },

    submit(target, e) {
        e.preventDefault();
        const form = new Form(e.target);
        const newNoteId = crypto.randomUUID;
        create.note(form.name, form.description, form.date, noteId);
        const projectId = ui.main.dataset.id;
        sidebar.currentProject(projectId).notes.push(new Note(form.name, form.description, form.date, newNoteId));
        ui.refreshForm();
    },
    
    changeDescription(target, e) {
        const noteElement = target.closest(".note-container")        
        const description = noteElement.querySelector(".description");
        const input = create.textInput("description", "enterInput")

        description.textContent = "";
        description.append(input);
        input.focus();
    },

    createProject(textContent) {
        const id = crypto.randomUUID(); // assign a random id to project
        sidebar.projects.push(new Project(textContent, id));
        const project = sidebar.currentProject(id);
        this.createTab(project);
        this.displayProject(project);
    },

    createTab(project) {
        ui.sidebarProjects.append(create.tab(project))
    },

    displayDefaultProject(id) { 
        const project = sidebar.currentProject(id); // if input, change the project focus to the new object
        this.createTab(project);
        this.displayProject(project);
    }, 

    displayProject(project){ // display a project that already exists
        ui.refreshMain();
        ui.main.dataset.id = project.id;
        ui.main.append(create.title(project.name));
        create.addTask();
        for (const note of project.notes) {
            create.note(note.name, note.description, note.duedate, note.id);
        }
    },
}

new Event("[data-click]", "click");
new Event("[data-keydown]", "keydown")
new Event("[data-submit]", "submit")

domEvent.displayDefaultProject(sidebar.projects[0].id); // make the welcome the first page

console.log(sidebar.projects)