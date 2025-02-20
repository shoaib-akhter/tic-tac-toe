document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const playAgainButton = document.getElementById('playAgain');
    const endGameButton = document.getElementById('endGame');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const gameStatus = document.getElementById('gameStatus');
    const gameSetup = document.getElementById('gameSetup');
    const gameContainer = document.getElementById('gameContainer');
    const gameBoard = document.getElementById('gameBoard');
    const scoreBoard = document.getElementById('scoreBoard');
    const player1ScoreDisplay = document.getElementById('player1Score');
    const player2ScoreDisplay = document.getElementById('player2Score');

    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    let gameActive = false;
    let board = ['', '', '', '', '', '', '', '', ''];
    let scores = {
        X: 0,
        O: 0
    };

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const updateScoreDisplay = () => {
        player1ScoreDisplay.textContent = `${player1Name}: ${scores.X}`;
        player2ScoreDisplay.textContent = `${player2Name}: ${scores.O}`;
    };

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

        if (board[index] !== '') return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            const winnerName = winner === 'X' ? player1Name : player2Name;
            gameStatus.style.color = 'green';
            gameStatus.textContent = `${winnerName} wins!`;
            scores[winner]++;
            updateScoreDisplay();
            gameActive = false;
            playAgainButton.classList.remove('hidden');
            endGameButton.classList.remove('hidden');
            return;
        }

        if (checkDraw()) {
            gameStatus.style.color = 'blue';
            gameStatus.textContent = "It's a draw!";
            gameActive = false;
            playAgainButton.classList.remove('hidden');
            endGameButton.classList.remove('hidden');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        gameStatus.textContent = `${currentPlayerName}'s turn (${currentPlayer})`;
    };

    const startNewGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        createGameBoard();
        gameStatus.style.color = 'black';
        gameStatus.textContent = `${player1Name}'s turn (X)`;
        playAgainButton.classList.add('hidden');
        endGameButton.classList.add('hidden');
    };

    const resetGame = () => {
        gameSetup.classList.remove('hidden');
        gameContainer.classList.add('hidden');
        gameStatus.textContent = '';
        player1Input.value = '';
        player2Input.value = '';
        scores = { X: 0, O: 0 };
        playAgainButton.classList.add('hidden');
        endGameButton.classList.add('hidden');
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

        gameSetup.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        
        startNewGame();
        updateScoreDisplay();
    });

    playAgainButton.addEventListener('click', startNewGame);
    endGameButton.addEventListener('click', resetGame);
});