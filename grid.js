const MAX_GRID_SIZE = 100;
const STARTING_GRID_SIZE = 16;
let pixelSizePerBox = 50;
let currentGridSize = STARTING_GRID_SIZE;

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function createGrid(gridSize = STARTING_GRID_SIZE) {
    currentGridSize = gridSize;
    let numberOfBoxes = gridSize * gridSize;

    for (let i = 1; i <= numberOfBoxes; i++) {
        let box = document.createElement('div');
        box.classList.add('grid-box');
        box.id = `grid-box-${i}`;
        box.style.flex = `0 0 ${pixelSizePerBox}px`;
        box.style.width = `${pixelSizePerBox}px`;

        box.addEventListener('mouseover', (e) => {
            let randomBackgroundColor = randomColor();
            box.style.backgroundColor = randomBackgroundColor;

            let opacity = box.style.opacity;
            let newOpacity = opacity > 0 ? (parseFloat(opacity) + 0.1) : 0.1;
            box.style.opacity = newOpacity;
        });

        grid.appendChild(box);
    }

    // Size accounts for number of boxes plus 1px border around each box
    let maxSize = (pixelSizePerBox * gridSize) + (gridSize * 2);
    grid.style.maxHeight = `${maxSize}px`;
    grid.style.maxWidth = `${maxSize}px`;
}

let grid = document.createElement('div');
grid.id = 'grid-container';
grid.style.display = 'flex';
grid.style.flexDirection = 'column';
grid.style.flexWrap = 'wrap';
grid.style.border = '1px solid black';
createGrid();

let resizeGridButton = document.createElement('button');
resizeGridButton.textContent = 'Resize Grid Dimensions';
resizeGridButton.addEventListener('click', (e) => {
    let gridSize = -1;
    do {
        gridSize = prompt("Please enter a valid number between 1 and 100:");
    } while (gridSize <= 0 || gridSize > 100);

    document.getElementById('grid-container').innerHTML = '';    
    createGrid(gridSize);
});

let resizeBoxSizeButton = document.createElement('button');
resizeBoxSizeButton.textContent = 'Resize Box Size';
resizeBoxSizeButton.addEventListener('click', (e) => {
    let boxSize = -1;
    do {
        boxSize = prompt("Type in your desired box pixel size (25-100):");
    } while (boxSize < 25 || boxSize > 100);

    document.getElementById('grid-container').innerHTML = '';
    pixelSizePerBox = boxSize;    
    createGrid(currentGridSize);
});

document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.gap = '15px';
document.body.appendChild(resizeGridButton);
document.body.appendChild(resizeBoxSizeButton);
document.body.appendChild(grid);

// Randomize color each time a box is hovered over
let gridBoxes = document.querySelectorAll('.grid-box');
gridBoxes.forEach((box) => {
    box.addEventListener('mouseover', (e) => {
        box.style.backgroundColor = randomColor();
    });
});