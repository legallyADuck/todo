export const ui = {
    get body() {return document.querySelector("body");},
    get sidebarProjects() {return document.querySelector(".sidebar-projects")},
}

export const create = {
    textInput(placeholder, action) {
        const input = document.createElement("input");
        input.placeholder = placeholder;
        input.dataset.action = action;
        input.type = "text";
        return input
    }
}
// the difference betwen get and a function is that a get works as a key, thats about it.