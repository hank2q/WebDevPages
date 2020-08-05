function main(event) {
    var allElem = document.querySelectorAll("*");
    for (elem of allElem) {
        try {
            elem.setAttribute("draggable", false);
        } catch (error) {}
    }
    var current = 0;
    var container = document.querySelector(".container");
    var image = document.querySelector(".image");
    var lable = document.querySelector(".lable");
    image.src = files[0];
    lable.textContent = names[0];
    var allBtn = document.querySelector(".all");
    var next = document.querySelector(".next");
    var prev = document.querySelector(".prev");
    var query = window.matchMedia("(max-width: 1024px)");

    function Next() {
        current += 1;
        if (current == files.length) {
            current = 0;
        }
        image.src = files[current];
        lable.textContent = names[current];
    }
    function Prev() {
        current -= 1;
        if (current < 0) {
            current = files.length - 1;
        }
        image.src = files[current];
        lable.textContent = names[current];
    }
    document.addEventListener("keyup", function (event) {
        if (event.keyCode === 37) {
            Prev();
        } else if (event.keyCode === 39) {
            Next();
        }
    });
    next.addEventListener("click", Next);
    prev.addEventListener("click", Prev);
    container.addEventListener("click", function (event) {
        if (query.matches) {
            let position = event.x;
            let midPoint = Math.floor(container.clientWidth / 2);
            if (position < midPoint) {
                Prev();
            } else {
                Next();
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", main);
