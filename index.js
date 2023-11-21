// & document.querySelector -> Return the 1st element from the html document that matches the selector
let container = document.querySelector(".container");

// & document.getElementById get the 1st element by the id name
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    }
};

let deviceType = "";

// & draw and erase will start as false
let draw = false;
let erase = false;

// & to detect touch device
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};
// & call the function
isTouchDevice();

// & Create the Grid
// ~ .addEventListener -> function will be called when event is fired
gridButton.addEventListener("click", () => {
    /*
    ~ insert html into the document instead of replace the contents of the element
    ~ clear the old grid
    */
    container.innerHTML = "";
    // ~ count the variable for generating unique ids
    let count = 0;

    // ~ loop for creating rows
    for (let i = 0; i < gridHeight.value; i++) {
        // ? increments by 2
        count += 2;
        // ? create div for rows
        let div = document.createElement("div");
        div.classList.add("gridRow");

        // ~ loop for creating columns 
        for (let j = 0; j < gridWidth.value; j++) {
            // ? increment by 2
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            // ? Unique ids are needed for all columns
            col.setAttribute("id", `gridCol${count}`);

            col.addEventListener(events[deviceType].down, () => {
                // ? user starts drawing
                draw = true;

                // ? if erase = true then the background = transparent else it is color
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                // ? elementFromPoint will return the element at x,y position of mouse
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            // ~ this will stop the drawing
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            // ~ append columns -> can add a new the child element to the end of as parent element 
            div.appendChild(col);
        }

        // ~ append the grid to the container
        container.appendChild(div);
    }
});

// & this is to check if the function is working
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");

    // ~ this function will loop through all the boxes
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
};

// & Clears the grid
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

// & Erase button functionality
eraseBtn.addEventListener("click", () => {
    erase = true;
});

// & Paint button functionality
paintBtn.addEventListener("click", () => {
    erase = false;
});

// & Display the grid width and grid height
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

// ~ this is fired when the whole page loads
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};

