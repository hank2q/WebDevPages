// elements
const container = document.querySelector(".notes");
const newButton = document.querySelector("#new");
const modal = document.querySelector(".modal");
const modalCont = document.querySelector(".modal-cont");
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
const closeModal = document.querySelector(".fa-times");
let noteIndex = 0;

// event listeners
document.addEventListener("DOMContentLoaded", retreiveNotes);
newButton.addEventListener("click", makeNote);
closeModal.addEventListener("click", () => {
    modal.style.visibility = "hidden";
    enableScroll();
});

// functions
function makeNote() {
    // making the note element
    const note = document.createElement("div");
    note.className = "note-wrapper";
    note.id = "i-" + noteIndex;
    const noteHtml = `<div class="note">
                            <input type="text" class="note-title" placeholder="New Note"></input>
                            <textarea class="note-body" data-simplebar></textarea>
                        </div>
                        <div class="options">
                            <i class="fas fa-trash-alt"></i>
                            <i class="fas fa-external-link-alt"></i>
                            <i class="fas fa-palette"></i>
                            <ul class="colors invisible">
                                <li><i class="fas fa-circle red" style="color: #f03463"></i></li>
                                <li><i class="fas fa-circle green" style="color: #00b988"></i></li>
                                <li><i class="fas fa-circle blue" style="color: #3e92cc"></i></li>
                                <li><i class="fas fa-circle yellow" style="color: #ffff3f"></i></li>
                                <li><i class="fas fa-circle white" style="color: #fffaff"></i></li>
                            </ul>
                        </div>`;
    note.innerHTML = noteHtml;
    container.appendChild(note);
    note.querySelector("textarea").focus();
    note.Color = "#ffff3f";
    // adding functionality to the note buttons
    // deleting the note
    let deleteBtn = note.querySelector(".fa-trash-alt");
    deleteBtn.addEventListener("click", () => {
        note.remove();
        deleteNote(note);
    });
    // modal the note
    let expand = note.querySelector(".fa-external-link-alt");
    expand.addEventListener("click", () => {
        modalShow(note);
    });
    // changing color
    let colorsList = note.querySelector(".colors");
    let palletBtn = note.querySelector(".fa-palette");
    palletBtn.addEventListener("click", () => {
        colorsList.classList.toggle("invisible");
    });
    colorsList.addEventListener("click", (e) => {
        if (e.target.tagName == "I") {
            let color = e.target.style.color;
            changeNoteColor(note, color);
            colorsList.classList.toggle("invisible");
            updateColor(note, color);
            note.Color = color;
        }
    });
    // change saving
    let text = note.querySelector("textarea");
    note.addEventListener("input", () => {
        saveNote(note);
    });
    noteIndex++;
    return note;
}

function modalShow(note) {
    let title = note.querySelector(".note-title");
    let newTitle;
    let body = note.querySelector(".note-body").value;
    if (title.value == "") {
        newTitle = title.getAttribute("placeholder");
    } else {
        newTitle = title.value;
    }

    modalTitle.textContent = newTitle;
    modalBody.innerHTML = body;
    modalCont.style.backgroundColor = note.style.backgroundColor;
    modal.style.visibility = "visible";
    disableScroll();
}

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
        (window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        });
}

function enableScroll() {
    window.onscroll = function () {};
}

function changeNoteColor(note, color) {
    note.style.backgroundColor = color;
    note.querySelector(".note-title").style.backgroundColor = color;
    note.querySelector(".note-body").style.backgroundColor = color;
}

function updateColor(note, color) {
    notes = JSON.parse(localStorage.getItem("notes"));
    notes[note.id].color = color;
    localStorage.setItem("notes", JSON.stringify(notes));
}

function saveNote(note) {
    let Note = {
        title: note.querySelector(".note-title").value || "New Note",
        body: note.querySelector(".note-body").value,
        color: note.Color,
    };
    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = {};
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    notes[note.id] = Note;
    localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(note) {
    notes = JSON.parse(localStorage.getItem("notes"));
    delete notes[note.id];
    localStorage.setItem("notes", JSON.stringify(notes));
}

function retreiveNotes() {
    let notes;
    if (localStorage.getItem("notes") === null) {
        return;
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
        for (id in notes) {
            let note = notes[id];
            let emptyNote = makeNote();
            emptyNote.querySelector(".note-title").value = note.title;
            emptyNote.querySelector(".note-body").value = note.body;
            changeNoteColor(emptyNote, note.color);
        }
        let newKey = 0;
        for (id in notes) {
            notes = renameKey(notes, id, "i-" + newKey);
            newKey++;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}

const renameKey = (object, oldKey, newKey) => {
    const clone = (obj) => Object.assign({}, obj);
    const clonedObj = clone(object);
    const targetKey = clonedObj[oldKey];
    delete clonedObj[oldKey];
    clonedObj[newKey] = targetKey;
    return clonedObj;
};
