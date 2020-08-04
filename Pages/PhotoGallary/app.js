function main(event) {
    var images = [
        "images/logo1v2 - small.png",
        "images/logo1v2.png",
        "images/logo2 original.png",
        "images/Untitled.png",
        "images/mountain.png",
        "images/screenshot.png",
        "images/tcempty multi.ico",
    ];
    var current = 0;
    var image = document.querySelector(".image");
    var allBtn = document.querySelector(".all");
    var next = document.querySelector(".next");
    var prev = document.querySelector(".prev");
    function Next() {
        current += 1;
        if (current == images.length) {
            current = 0;
        }
        image.src = images[current];
    }
    function Prev() {
        current -= 1;
        if (current < 0) {
            current = images.length - 1;
        }
        image.src = images[current];
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
}

document.addEventListener("DOMContentLoaded", main);
