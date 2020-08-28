// elements
const inputText = document.querySelector("input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".list");
const datePlace = document.querySelector("#date");
let counter = 0;
// events
document.addEventListener("DOMContentLoaded", loadTodos);
document.addEventListener("DOMContentLoaded", () => {
    let date = new Date();
    let dayDate = date.getDate();
    let year = date.getFullYear();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let month = months[date.getMonth()];
    datePlace.innerHTML = `${day}, ${dayDate} ${month} ${year}`;
});
inputText.addEventListener("keyup", (event) => {
    if (event.keyCode == 13 && inputText.value && !isEmpty(inputText.value)) {
        addTodo(inputText.value, false);
        inputText.value = "";
    }
});
addBtn.addEventListener("click", () => {
    if (inputText.value && !isEmpty(inputText.value)) {
        addTodo(inputText.value, false);
        inputText.value = "";
    }
});
// functions
function isEmpty(str) {
    return str.replace(/^\s+|\s+$/gm, "").length == 0;
}

function addTodo(text, done) {
    const todoElem = document.createElement("li");
    todoElem.id = counter;
    counter++;
    const itemCont = `<p contenteditable="">${text}</p>
                        <button id="check">
                            <i class="far fa-check-circle"></i>
                        </button>
                        <button id="remove">
                            <i class="fas fa-times-circle"></i>
                        </button>`;
    todoElem.innerHTML = itemCont;
    todoList.insertAdjacentElement("beforeend", todoElem);
    const delBtn = todoElem.querySelector("#remove");
    const checkBtn = todoElem.querySelector("#check");
    if (done) {
        todoElem.classList.toggle("done");
        checkBtn.childNodes[1].classList.toggle("fas");
        checkBtn.childNodes[1].classList.toggle("far");
    }
    //adding functionality
    todoElem.addEventListener("input", () => {
        editStorage(todoElem);
    });
    delBtn.addEventListener("click", () => {
        todoElem.remove();
        todos = JSON.parse(localStorage.getItem("todos"));
        delete todos[todoElem.id];
        localStorage.setItem("todos", JSON.stringify(todos));
    });
    checkBtn.addEventListener("click", () => {
        todoElem.classList.toggle("done");
        checkBtn.childNodes[1].classList.toggle("fas");
        checkBtn.childNodes[1].classList.toggle("far");
        editStorage(todoElem);
    });

    // saving
    saveTodo(todoElem);
}

function saveTodo(todo) {
    let Todo = {
        id: todo.id,
        text: todo.querySelector("p").textContent,
        done: Boolean(todo.className),
    };
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(Todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function editStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let Todo = todos[todo.id];
    Todo.done = Boolean(todo.className);
    Todo.text = todo.querySelector("p").textContent;
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    if (localStorage.getItem("todos") === null) {
        return;
    } else {
        let todos = JSON.parse(localStorage.getItem("todos"));
        localStorage.setItem("todos", JSON.stringify([]));
        for (id in todos) {
            if (todos[id]) {
                todo = todos[id];
                addTodo(todo.text, todo.done);
            }
        }
    }
}
