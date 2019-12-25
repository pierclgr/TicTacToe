// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;
let startingPlayer = ai;

function setup() {
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    if (startingPlayer == ai) {
        let out = minimax(board, -Infinity, Infinity, 0, true);
        board[out.px][out.py] = ai;
        currentPlayer = human;
    }
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner(currentBoard) {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(currentBoard[i][0], currentBoard[i][1], currentBoard[i][2])) {
            winner = currentBoard[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(currentBoard[0][i], currentBoard[1][i], currentBoard[2][i])) {
            winner = currentBoard[0][i];
        }
    }

    // Diagonal
    if (equals3(currentBoard[0][0], currentBoard[1][1], currentBoard[2][2])) {
        winner = currentBoard[0][0];
    }
    if (equals3(currentBoard[2][0], currentBoard[1][1], currentBoard[0][2])) {
        winner = currentBoard[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentBoard[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function mousePressed() {
    if (currentPlayer == human) {
        // Human make turn
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        // If valid turn
        if (board[i][j] == '') {
            board[i][j] = human;
            currentPlayer = ai;
            let out = minimax(board, -Infinity, Infinity, 0, true);
            board[out.px][out.py] = ai;
            currentPlayer = human;
        }
    }
}

function draw() {
    background(255);
    strokeWeight(4);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == human) {
                noFill();
                ellipse(x, y, r * 2);
            } else if (spot == ai) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }

    let result = checkWinner(board);
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'tie') {
            resultP.html('Tie!');
        } else {
            resultP.html(`${result} wins!`);
        }
    }
}