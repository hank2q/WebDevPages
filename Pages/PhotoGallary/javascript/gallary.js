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
    var imageParen = document.querySelector(".images");
    var lable = document.querySelector(".lable");
    var fullScreenBtn = document.querySelector(".expand");
    var images = [];
    (function () {
        for (img in files) {
            images[img] = new Image();
            images[img].src = files[img];
            images[img].className = "image";
            images[img].alt = "Photo";
        }
    })();
    imageParen.replaceChild(images[0], image);
    image = images[0];
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
        imageParen.replaceChild(images[current], image);
        image = images[current];
        lable.textContent = names[current];
    }
    function Prev() {
        current -= 1;
        if (current < 0) {
            current = images.length - 1;
        }
        imageParen.replaceChild(images[current], image);
        image = images[current];
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
    function mouseBrowse(event) {
        let position = event.x;
        let midPoint = Math.floor(imageParen.clientWidth / 2);
        if (position < midPoint) {
            Prev();
        } else {
            Next();
        }
    }
    container.addEventListener("click", function (event) {
        if (query.matches) {
            mouseBrowse(event);
        }
    });
    function isFullScreen() {
        return document.fullscreenElement;
    }
    function resetFull() {
        imageParen.style.backgroundColor = "";
        fullScreenBtn.style.right = "";
        fullScreenBtn.style.height = "5vh";
        imageParen.removeEventListener("click", mouseBrowse);
    }
    function toggleFull() {
        if (!isFullScreen()) {
            imageParen.requestFullscreen();
            imageParen.style.backgroundColor = "white";
            fullScreenBtn.style.right = "1%";
            fullScreenBtn.style.height = "3vh";
            imageParen.addEventListener("click", mouseBrowse);
        } else {
            document.exitFullscreen();
            resetFull();
        }
    }
    fullScreenBtn.addEventListener("click", toggleFull);
}

document.addEventListener("DOMContentLoaded", main);
