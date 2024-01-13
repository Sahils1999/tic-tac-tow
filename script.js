document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Initialize the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
    }

    function makeMove(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                alert(`Player ${currentPlayer} wins!`);
                break;
            }
        }

        if (!gameBoard.includes('') && gameActive) {
            gameActive = false;
            alert('It\'s a tie!');
        }
    }
});
