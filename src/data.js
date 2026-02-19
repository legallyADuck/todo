export {Note, Project}

class Note { // M
    constructor(name, description, duedate, id) {
        this.name = name;
        this.description = description;
        this.duedate = duedate;
        this.id = id;
    }
}

class Project { // M
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.notes = [];
    }

    currentNote(datasetId) {
        return this.notes.find((note) => datasetId === note.id);
    }
}

export const sidebar = { // U
    projects: [],
    currentProject(datasetId) { return this.projects.find((project) => datasetId === project.id); }
}

const welcome = new Project("Welcome!", crypto.randomUUID());
welcome.notes.push(new Note("quack", "quack example", "27-3-2027", crypto.randomUUID()));
sidebar.projects.push(welcome);

// console.log(welcome.currentNote("note2"))


