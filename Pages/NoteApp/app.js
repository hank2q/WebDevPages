// elements
const container = document.querySelector(".notes");
const newButton = document.querySelector("#new");
const modal = document.querySelector(".modal");
const modalCont = document.querySelector(".modal-cont");
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
const closeModal = document.querySelector(".fa-times");

// event listeners
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

    // adding functionality to the note buttons
    // deleting the note
    let deleteBtn = note.querySelector(".fa-trash-alt");
    deleteBtn.addEventListener("click", () => {
        note.remove();
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
        changeNoteColor(note, e.target.style.color);
        colorsList.classList.toggle("invisible");
    });
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

function saveNote(note) {
    let Note = {
        title: note.querySelector(".note-title").value || "New Note",
        body: note.querySelector(".note-body").value,
    };
    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    notes.push(Note);
    localStorage.setItem("notes", JSON.stringify(notes));
}
