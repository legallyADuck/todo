export const ui = {
    get body() {return document.querySelector("body");},
    get sidebarProjects() {return document.querySelector(".sidebar-projects")},
    get input() {return document.querySelector('input')},
    get projectsArray() {return Array.from(ui.sidebarProjects.children)},
    get main() {return document.querySelector("main")},
    get form() {return document.querySelector("form")},
    get title() {return document.querySelector(".project-name")},
    refreshForm() {
        const inputs = this.form.querySelectorAll("input");
        inputs.forEach((input) => input.value = "")
    },
    refreshMain() {
        if (ui.main.childElementCount === 0) return console.warn("main was already empty, no need to refresh");
        this.main.replaceChildren(); 
    },
}

export const create = {
    textInput(placeholder, action) {
        const input = document.createElement("input");
        input.placeholder = placeholder;
        if (action) input.dataset.keydown = action;
        input.type = "text";
        return input
    }, 
    checkboxInput (action, id) {
        const input = document.createElement("input");
        input.dataset.click = action;
        input.type = "checkbox";
        return input
    },
    tab(project) {
        const tab = document.createElement("div");
        tab.textContent = project.name;
        tab.dataset.click = "tabClick"
        tab.dataset.id = project.id;
        return tab;
    },
    title(name) {
        const title = document.createElement("div");
        title.textContent = name;
        title.className = "project-name";
        return title;
    },
    note(name, descriptionTxt, date, id) {
        // ── Main container ─────────────────────────────────────────────
        const noteContainer = document.createElement("div");
        noteContainer.className = "note-container";
        noteContainer.dataset.id = id;
        ui.main.lastElementChild.insertAdjacentElement("beforebegin", noteContainer)

        // ── Checkbox ───────────────────────────────────────────────────
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "done";          

        const noteInfo = document.createElement("div");
        noteInfo.className = "note-information";

        const noteName = document.createElement("div");
        noteName.className = "name";
        noteName.textContent = name;

        const description = document.createElement("div");
        description.className = "description";
        description.textContent = descriptionTxt;

        const sub = document.createElement("div");
        sub.className = "sub";

        const dueDateEl = document.createElement("div");
        dueDateEl.className = "duedate";
        dueDateEl.textContent = date;

        sub.append(dueDateEl);
        noteInfo.append(noteName, description, sub);

        // ── Right side (edit/menu) ─────────────────────────────────────
        const noteRightSide = document.createElement("div");
        noteRightSide.className = "right-side-note";

        const editIcon = document.createElement("div");
        editIcon.className = "edit";

        const menu = document.createElement("div");
        menu.className = "menu";

        const changeDescription = document.createElement("div");
        changeDescription.className = "changeDescription";
        changeDescription.textContent = "Description";
        changeDescription.dataset.click = "changeDescription"

        const dueDateMenu = document.createElement("div");
        dueDateMenu.className = "dueDate";
        dueDateMenu.textContent = "Due date";
        dueDateMenu.dataset.click = "changeDueDate"

        const deleteNote = document.createElement("div");
        deleteNote.className = "deleteNote";
        deleteNote.textContent = "Delete";
        deleteNote.dataset.click = "changeDuedate";

        menu.append(changeDescription, dueDateMenu, deleteNote);
        noteRightSide.append(editIcon, menu);

        // ── Assemble everything ────────────────────────────────────────
        noteContainer.append(checkbox, noteInfo, noteRightSide);
    },
    addTask(){
        const container = document.createElement("div");
        container.className = "add-task-btn";
        container.dataset.click = "createForm";

        const icon = document.createElement("div");
        icon.textContent = "+"

        const text = document.createElement("div");
        text.textContent = "Add task";

        container.append(icon, text);
        ui.main.appendChild(container);
    },
    form() {
        // Create the form container
        const container = document.createElement("form");
        container.className = "create-note-flex";

        // Task name input
        const inputName = document.createElement("input");
        inputName.type = "text";
        inputName.placeholder = "Task name";
        inputName.id = "task-name";
        inputName.required = true;

        // Description input
        const inputDescription = document.createElement("input");
        inputDescription.type = "text";
        inputDescription.placeholder = "description";
        inputDescription.id = "description-name";

        // Due date input
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "date";


        const buttonContainer = document.createElement("div")
        buttonContainer.className = "btn-container";

        // Submit button
        const btn = document.createElement("button")
        btn.className = "send-btn";
        btn.type = "submit";
        btn.dataset.submit = "submit";

        const icon = document.createElement("div");
        icon.className = "send";

        btn.appendChild(icon);

        // cancel button    
        const btnClose = document.createElement("button")
        btnClose.className = "close";
        btnClose.dataset.click = "closeForm";
        btnClose.textContent = "Close";

        buttonContainer.append(btnClose, btn)

        container.append(
        inputName,
        inputDescription,
        dateInput,
        buttonContainer
        );

        ui.main.appendChild(container);
    }
}

// never use custom function again to create objects again