let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimax(currentBoard, alpha, beta, depth, isMaxizing) {
    let result = checkWinner(currentBoard);
    if (result !== null) {
        let bestScore = scores[result];
        let px = 0; 
        let py = 0;
        return { bestScore, px, py };
    }

    if (isMaxizing) {
        let px = 0;
        let py = 0;
        let exit = false;
        let bestScore = -Infinity;
        for (let i = 0; i < 3 && !exit; i++) {
            for (let j = 0; j < 3 && !exit; j++) {
                if (currentBoard[i][j] == '') {
                    currentBoard[i][j] = ai;
                    let out = minimax(currentBoard, alpha, beta, depth + 1, false);
                    currentBoard[i][j] = '';
                    if (out.bestScore > bestScore) {
                        bestScore = out.bestScore;
                        px = i;
                        py = j;
                    }
                    alpha = max(alpha, out.bestScore);
                    if (beta <= alpha) {
                        exit = true;
                    }
                }
            }
        }
        return { bestScore, px, py };
    } else {
        let px = 0;
        let py = 0;
        let exit = false;
        let bestScore = +Infinity;
        for (let i = 0; i < 3 && !exit; i++) {
            for (let j = 0; j < 3 && !exit; j++) {
                if (currentBoard[i][j] == '') {
                    currentBoard[i][j] = human;
                    let out = minimax(currentBoard, alpha, beta, depth + 1, true);
                    currentBoard[i][j] = '';
                    if (out.bestScore < bestScore) {
                        bestScore = out.bestScore;
                        px = i;
                        py = j;
                    }
                    beta = min(beta, out.bestScore);
                    if (beta <= alpha) {
                        exit = true;
                    }
                }
            }
        }
        return { bestScore, px, py };
    }
}