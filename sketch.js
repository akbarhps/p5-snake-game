let canvasHeight;
let canvasWidth;

let grid = [];
let gridRow = 20;
let gridColumn = 20;

let cellHeight;
let cellWidth;

let foodGrid;

let snakeDirection;
let snakeBody = [];

function setupLayout() {
    const size = min(windowHeight, windowWidth);
    canvasHeight = size;
    canvasWidth = size;
    createCanvas(canvasWidth, canvasHeight).parent('view');
    cellHeight = Math.floor(canvasHeight / gridRow);
    cellWidth = Math.floor(canvasWidth / gridColumn);

    for (let y = 0; y < gridRow; y++) {
        let columns = [];
        for (let x = 0; x < gridColumn; x++) {
            columns.push(new Cell(y, x));
        }
        grid[y] = columns;
    }

    foodGrid = {x: 10, y: 10};
    snakeBody = [{x: 0, y: 0}];
    snakeDirection = {x: 0, y: 1};

    for (let y = 0; y < gridRow; y++) {
        for (let x = 0; x < gridColumn; x++) {
            grid[y][x].draw();
        }
    }
}

function setup() {
    frameRate(5);
    setupLayout();
}

function draw() {
    grid[foodGrid.y][foodGrid.x].draw('food');
    updateSnake();
}

function updateSnake() {
    console.log(snakeDirection.x, snakeDirection.y);
    const tail = {x: snakeBody[snakeBody.length - 1].x, y: snakeBody[snakeBody.length - 1].y};
    const head = {x: snakeBody[0].x, y: snakeBody[0].y};

    let newHeadX = head.x + snakeDirection.x;
    if (newHeadX > -1 && newHeadX < gridColumn) {
        head.x = newHeadX;
    }
    let newHeadY = head.y + snakeDirection.y;
    if (newHeadY > -1 && newHeadY < gridRow) {
        head.y = newHeadY;
    }

    snakeBody.unshift(head);
    if (head.x === foodGrid.x && head.y === foodGrid.y) {
        generateFood();
    } else {
        grid[tail.y][tail.x].draw();
        snakeBody.pop();
    }

    grid[head.y][head.x].draw('body');
}

function keyPressed() {
    let snakeX = 0, snakeY = 0;
    switch (keyCode) {
        case RIGHT_ARROW:
            snakeX = 1;
            break;
        case LEFT_ARROW:
            snakeX = -1;
            break;
        case UP_ARROW:
            snakeY = -1;
            break;
        case DOWN_ARROW:
            snakeY = 1;
    }
    snakeDirection = {y: snakeX, x: snakeY};
    return false;
}

function generateFood() {
    let randX = 0, randY = 0;
    while (randX === 0 || randX === gridColumn - 1) {
        randX = Math.floor(Math.random() * gridColumn);
    }
    while (randY === 0 || randY === gridRow - 1) {
        randY = Math.floor(Math.random() * gridRow);
    }

    foodGrid = {x: randX, y: randY};
}
