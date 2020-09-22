function main(event) {
    const allElem = document.querySelectorAll("*");
    for (elem of allElem) {
        try {
            elem.setAttribute("draggable", false);
        } catch (error) {}
    }
    const allBtn = document.querySelectorAll(".all-btn");
    const secondPage = document.getElementById("all");
    const container = document.querySelector(".container");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    const query = window.matchMedia("(max-width: 1024px)");
    var image = document.querySelector(".image");
    const imageParen = document.querySelector(".images");
    const lable = document.querySelector(".lable");
    const fullScreenBtn = document.querySelector(".expand");
    allBtn.forEach(function (btn) {
        btn.addEventListener("click", switchPage);
    });
    var allImages = [];
    function selectImage(img) {
        secondPage.style.display = "none";
        container.style.display = "";
        allBtn[0].style.display = "";
        allBtn[1].style.display = "";
        let selected = allImages.indexOf(img);
        imageParen.replaceChild(images[selected], imageParen.childNodes[1]);
        image = images[selected];
        lable.textContent = names[selected];
    }
    function switchPage() {
        if (secondPage.style.display == "" || secondPage.style.display == "none") {
            secondPage.style.display = "grid";
            container.style.display = "none";
            allBtn[0].style.display = "none";
            allBtn[1].style.display = "none";
            lable.textContent = "Gallary";
            let id = secondPage.classList[0];
            history.pushState({ id }, "All images", "./all");
            if (secondPage.childElementCount === 0) {
                images.forEach(function (image) {
                    let newImage = new Image();
                    newImage.src = image.src;
                    newImage.className = "img";
                    let imgContainer = document.createElement("div");
                    imgContainer.className = "background";
                    imgContainer.appendChild(newImage);
                    imgContainer.addEventListener("click", function () {
                        selectImage(newImage);
                        history.replaceState(null, "Home", "./");
                    });
                    secondPage.appendChild(imgContainer);
                    allImages.push(newImage);
                });
            }
        }
    }
    window.addEventListener("popstate", (e) => {
        secondPage.style.display = "none";
        container.style.display = "";
        allBtn[0].style.display = "";
        allBtn[1].style.display = "";
    });
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

    function Next() {
        current = images.indexOf(image);
        current += 1;

        if (current == images.length) {
            current = 0;
        }
        imageParen.replaceChild(images[current], image);
        image = images[current];
        lable.textContent = names[current];
    }
    function Prev() {
        current = images.indexOf(image);
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
        fullScreenBtn.src = "assets/expand.svg";
        fullScreenBtn.style.right = "";
        fullScreenBtn.style.height = "5vh";
        imageParen.removeEventListener("click", mouseBrowse);
    }
    function toggleFull() {
        if (!isFullScreen()) {
            imageParen.requestFullscreen();
            imageParen.addEventListener("click", mouseBrowse);
            fullScreenBtn.src = "assets/exwhite.svg";
            fullScreenBtn.style.right = "1%";
            fullScreenBtn.style.height = "3vh";
            Prev();
            if (query.matches) {
                Prev();
            }
        } else {
            document.exitFullscreen();
            resetFull();
            if (query.matches) {
                Prev();
            }
        }
    }
    fullScreenBtn.addEventListener("click", toggleFull);
    document.addEventListener("fullscreenchange", function () {
        if (!isFullScreen()) {
            resetFull();
        }
    });
}

document.addEventListener("DOMContentLoaded", main);
