export { ClickManager };
import { ui, create } from "./domAssets.js";


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
        const target = e.target.closest(this.selector) // returns the element if it has a "[data-action]", else it is null
        if (target == null) return;
        const action = target.dataset.action;
        if (typeof domEvent[action] === "function") {
            domEvent[action](); 
        };

    }
}


const domEvent = {
    close() {

    },
    addProjectTemplate() {
        const input = create.textInput("New task", "addNameToProject")
        ui.sidebarProjects.appendChild(input);
        input.focus();
    },
}

new ClickManager(ui.body, "[data-action]")
