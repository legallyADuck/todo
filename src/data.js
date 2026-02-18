export {Note, Project}

class Note { // new button creates a new instance of note
    constructor(name, description, duedate, priority) {
        this.name = name;
        this.description = description;
        this.duedate = duedate;
        this.id = id;
    }
}

class Project { // each time we press the button we create a new instance
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.notes = []; // array to store notes 
    }

    // add id method to project
}

class Sidebar {
    constructor() {
        this.projects = []; // array to store projects
        this.currentProject;
    }

    changeCurrentProject(givenName) {
        const index = this.currentProjectIndex(givenName);
        this.currentProject = sidebar.projects[index];
        return this.currentProject;
    }

    currentProjectIndex(id) {
        const indexValue = sidebar.projects.reduce((accumulator, obj, index) => { 
            if (givenName === obj.name) return index; 
            return accumulator;
        }, 0)
    
        return indexValue;
    }
}

export const sidebar = new Sidebar();
const welcome = new Project("Welcome!");
welcome.notes.push(new Note("quack", "quack quack", "27/3", "urgent"));
console.log(welcome.notes);
sidebar.projects.push(welcome);


// ejemplo


// const project = new Project("project-example");
// project.ejemplo();

// const notaEjemplo = {
//     note: "hola",
//     description: "quack"
// }

// project.addToList(notaEjemplo)

// console.log(project)


