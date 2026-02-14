import "./styles.css";
import { ClickManager } from "./domEventHandler.js";

class Note { // new button creates a new instance of note
    constructor(name, description, duedate, priority) {
        this.name = name;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        // this.checklist = checklist;
    }
}

class Projects { // each time we press a button we create a new instance
    constructor(project) {
        this.project = project;
    }
}