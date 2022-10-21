console.log("Hello world!");

let x = [null, null, null],
    y = [null, null, null],
    icon = 0;

const tiles = document.querySelectorAll("#container > div");
const iconTurn = document.querySelector("#icon");

tiles.forEach((element, index) => {
        tiles[index].addEventListener("click", () => {
        switch(icon) {
        case 0:
            if (element.classList.contains("empty") || !element.classList.contains("cross")) {
                element.classList = "circle";
                iconTurn.classList = "cross";
                icon = 1;
                break;
            } else {
                console.log("contains char")
            }
        case 1:
            if (element.classList.contains("empty") || !element.classList.contains("circle")) {
                element.classList = "cross";
                iconTurn.classList = "circle";
                icon = 0;
                break;
            } else {
                console.log("contains char");
            }
        }
    })
}); 

// First move will be circle thus i set the class here for it to show up on site load

iconTurn.classList = "circle";