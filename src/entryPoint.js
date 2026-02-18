import "./styles.css";
import { ui, create } from "./domAssets.js";
import { Note, Project, sidebar } from "./data.js";

class EventManager {
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
        if(input.value == "") return;
        input.remove()
        this.createProject(input.value) // create project if enter
    },

    tabClick(target) { 
        const project = sidebar.changeCurrentProject(target.textContent);
        this.displayProject(project);
    },

    createForm(target) {
        target.remove()
        create.form()
    },

    submit(target, e) {
        e.preventDefault();
        const form = new Form(e.target);
        sidebar.currentProject.notes.push(new Note(form.name, form.description, form.date));
        create.note(form.name, form.description, form.date);
        ui.refreshForm();
    },
    
    changeDescription() {
        
    },

    createProject(textContent) {
        const id = crypto.randomUUID();
        sidebar.projects.push(new Project(textContent, id)); // create new project 
        const project = sidebar.changeCurrentProject(id); // if input, change the project focus to the new object
        this.createTab(project);
        this.displayProject(project);
    },

    createTab(project) {
        ui.sidebarProjects.append(create.tab(project.name))
    },
    displayDefaultProject(textContent) { 
        const project = sidebar.changeCurrentProject(textContent); // if input, change the project focus to the new object
        this.createTab(project);
        this.displayProject(project);
    }, 
    displayProject(project){ // display a project that already exists
        ui.refreshMain();
        ui.main.append(create.title(project.name));
        create.addTask();
        for (const note of project.notes) {
            create.note(note.name, note.description, note.duedate, note.priority);
        }
    },
}

new Event("[data-click]", "click");
new Event("[data-keydown]", "keydown")
new Event("[data-submit]", "submit")

domEvent.displayDefaultProject(sidebar.projects[0].name); // make the welcome the first page
