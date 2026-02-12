import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

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

class ClickManager {
    constructor(body, selector) {
        this.body = body;
        this.selector = selector;
        this.createClickEvent();
    }

    createClickEvent() {
        this.body.addEventListener("click", (e) => this.handleEvent(e));
    } 

    handleEvent(e) {
        const target = e.target.closest(this.selector) // returns the element if it has a "data-action"
        if (target == null) return;
        const action = target.dataset.action;
        if (typeof domEvent[action] === "function") {
            
            domEvent[target.dataset.action](); // one has the action of "close"
        };

    }
}

const domEvent = {
    close() {
        console.log("closeee!")
    }
}

const body = document.querySelector("body");
new ClickManager(body, "[data-action]")
