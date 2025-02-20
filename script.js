document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const gameStatus = document.getElementById('gameStatus');
    const gameSetup = document.getElementById('gameSetup');
    const gameBoard = document.getElementById('gameBoard');

    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    let gameActive = false;
    let board = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkWinner = () => {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return board.every(cell => cell !== '');
    };

    const createGameBoard = () => {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    };

    const handleCellClick = (e) => {
        if (!gameActive) return;
        
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        // Check if cell is already taken
        if (board[index] !== '') return;

        // Update board array and UI
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Check for winner
        const winner = checkWinner();
        if (winner) {
            const winnerName = winner === 'X' ? player1Name : player2Name;
            gameStatus.style.color = 'green';
            gameStatus.textContent = `${winnerName} wins!`;
            gameActive = false;
            return;
        }

        // Check for draw
        if (checkDraw()) {
            gameStatus.style.color = 'blue';
            gameStatus.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        // Update status message
        const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        gameStatus.textContent = `${currentPlayerName}'s turn (${currentPlayer})`;
    };

    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        player1Name = player1Input.value.trim();
        player2Name = player2Input.value.trim();

        if (!player1Name || !player2Name) {
            gameStatus.style.color = 'red';
            gameStatus.textContent = 'Both players must enter their names!';
            return;
        }

        // Initialize game
        gameActive = true;
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        
        // Hide setup and show game board
        gameSetup.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        
        // Create game board
        createGameBoard();
        
        gameStatus.style.color = 'black';
        gameStatus.textContent = `${player1Name}'s turn (X)`;
    });
});