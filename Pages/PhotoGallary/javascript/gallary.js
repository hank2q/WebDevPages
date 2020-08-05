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
    var images = [];
    (function () {
        for (img in files) {
            images[img] = new Image();
            images[img].src = files[img];
            images[img].className = "image";
            images[img].alt = "Photo";
        }
    })();
    // image = images[0];
    image.parentNode.replaceChild(images[0], image);
    image = document.querySelector(".image");
    lable.textContent = names[0];
    var allBtn = document.querySelector(".all");
    var next = document.querySelector(".next");
    var prev = document.querySelector(".prev");
    var query = window.matchMedia("(max-width: 1024px)");

    function Next() {
        current += 1;
        if (current == images.length) {
            current = 0;
        }
        image = document.querySelector(".image");
        image.parentNode.replaceChild(images[current], image);
        lable.textContent = names[current];
    }
    function Prev() {
        current -= 1;
        if (current < 0) {
            current = images.length - 1;
        }
        image = document.querySelector(".image");
        image.parentNode.replaceChild(images[current], image);
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
