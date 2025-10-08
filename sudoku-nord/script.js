class SudokuGame {
    constructor() {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = Array(9).fill().map(() => Array(9).fill(0));
        this.userBoard = Array(9).fill().map(() => Array(9).fill(0));
        this.selectedCell = null;
        this.mistakes = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.isSolved = false;
        
        this.initializeGame();
        this.setupEventListeners();
        this.startNewGame();
    }

    initializeGame() {
        this.createBoard();
        this.updateTimer();
        this.updateMistakes();
    }

    createBoard() {
        const boardElement = document.getElementById('sudoku-board');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener('click', () => this.selectCell(row, col));
                
                boardElement.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        // Botones de números
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const number = parseInt(btn.dataset.number);
                this.inputNumber(number);
            });
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (this.selectedCell && !this.isSolved) {
                const key = e.key;
                if (key >= '1' && key <= '9') {
                    this.inputNumber(parseInt(key));
                } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
                    this.inputNumber(0);
                }
            }
        });

        // Nuevo juego
        document.getElementById('new-game').addEventListener('click', () => {
            this.startNewGame();
        });

        // Verificar solución
        document.getElementById('check-solution').addEventListener('click', () => {
            this.checkSolution();
        });

        // Resolver
        document.getElementById('solve').addEventListener('click', () => {
            this.solvePuzzle();
        });

        // Cambio de dificultad
        document.getElementById('difficulty').addEventListener('change', () => {
            this.startNewGame();
        });
    }

    selectCell(row, col) {
        // Deseleccionar celda anterior
        if (this.selectedCell) {
            const prevCell = document.querySelector(`[data-row="${this.selectedCell.row}"][data-col="${this.selectedCell.col}"]`);
            prevCell.classList.remove('selected');
            this.clearHighlights();
        }

        // No permitir seleccionar celdas dadas
        if (this.board[row][col] !== 0) {
            return;
        }

        // Seleccionar nueva celda
        this.selectedCell = { row, col };
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('selected');
        
        // Resaltar números relacionados
        this.highlightRelatedCells(row, col);
    }

    highlightRelatedCells(row, col) {
        this.clearHighlights();
        
        // Resaltar fila y columna
        for (let i = 0; i < 9; i++) {
            if (i !== col) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${i}"]`);
                cell.classList.add('highlighted');
            }
            if (i !== row) {
                const cell = document.querySelector(`[data-row="${i}"][data-col="${col}"]`);
                cell.classList.add('highlighted');
            }
        }

        // Resaltar caja 3x3
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if (r !== row || c !== col) {
                    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    cell.classList.add('highlighted');
                }
            }
        }
    }

    clearHighlights() {
        document.querySelectorAll('.cell.highlighted').forEach(cell => {
            cell.classList.remove('highlighted');
        });
    }

    inputNumber(number) {
        if (!this.selectedCell || this.isSolved) return;

        const { row, col } = this.selectedCell;
        
        // No permitir modificar números dados
        if (this.board[row][col] !== 0) return;

        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if (number === 0) {
            // Limpiar celda
            this.userBoard[row][col] = 0;
            cell.textContent = '';
            cell.classList.remove('error');
        } else {
            // Verificar si el número es correcto
            if (number === this.solution[row][col]) {
                this.userBoard[row][col] = number;
                cell.textContent = number;
                cell.classList.remove('error');
                
                // Verificar si el juego está completo
                if (this.isBoardComplete()) {
                    this.gameWon();
                }
            } else {
                // Número incorrecto
                this.userBoard[row][col] = number;
                cell.textContent = number;
                cell.classList.add('error');
                this.mistakes++;
                this.updateMistakes();
                
                // Mostrar mensaje de error
                this.showMessage('¡Número incorrecto!', 'error');
            }
        }
    }

    isBoardComplete() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.userBoard[row][col] !== this.solution[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    gameWon() {
        this.isSolved = true;
        clearInterval(this.timerInterval);
        this.showMessage('¡Felicidades! Has completado el Sudoku.', 'success');
    }

    generateSudoku() {
        // Generar una solución válida
        this.solution = this.generateSolution();
        
        // Crear un puzzle basado en la solución
        const difficulty = document.getElementById('difficulty').value;
        let cellsToRemove;
        
        switch (difficulty) {
            case 'easy':
                cellsToRemove = 35;
                break;
            case 'medium':
                cellsToRemove = 45;
                break;
            case 'hard':
                cellsToRemove = 55;
                break;
            case 'expert':
                cellsToRemove = 60;
                break;
            default:
                cellsToRemove = 45;
        }
        
        this.board = this.createPuzzle(this.solution, cellsToRemove);
        this.userBoard = this.board.map(row => [...row]);
    }

    generateSolution() {
        const board = Array(9).fill().map(() => Array(9).fill(0));
        
        // Llenar la diagonal principal con números válidos
        for (let i = 0; i < 9; i += 3) {
            this.fillBox(board, i, i);
        }
        
        // Resolver el resto del tablero
        this.solveSudoku(board);
        return board;
    }

    fillBox(board, row, col) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.shuffleArray(numbers);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[row + i][col + j] = numbers.pop();
            }
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            
                            if (this.solveSudoku(board)) {
                                return true;
                            }
                            
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    isValid(board, row, col, num) {
        // Verificar fila
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }
        
        // Verificar columna
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }
        
        // Verificar caja 3x3
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        
        return true;
    }

    createPuzzle(solution, cellsToRemove) {
        const puzzle = solution.map(row => [...row]);
        let removed = 0;
        
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (puzzle[row][col] !== 0) {
                // Guardar el valor original
                const temp = puzzle[row][col];
                puzzle[row][col] = 0;
                
                // Verificar que el puzzle tenga solución única
                const copy = puzzle.map(row => [...row]);
                if (this.countSolutions(copy) === 1) {
                    removed++;
                } else {
                    // Restaurar el valor si no tiene solución única
                    puzzle[row][col] = temp;
                }
            }
        }
        
        return puzzle;
    }

    countSolutions(board, count = 0) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9 && count < 2; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            count = this.countSolutions(board, count);
                            board[row][col] = 0;
                        }
                    }
                    return count;
                }
            }
        }
        return count + 1;
    }

    renderBoard() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                const value = this.userBoard[row][col];
                
                cell.textContent = value !== 0 ? value : '';
                cell.className = 'cell';
                
                if (this.board[row][col] !== 0) {
                    cell.classList.add('given');
                }
                
                if (value !== 0 && value !== this.solution[row][col]) {
                    cell.classList.add('error');
                }
            }
        }
    }

    startNewGame() {
        this.mistakes = 0;
        this.isSolved = false;
        this.selectedCell = null;
        this.clearHighlights();
        
        clearInterval(this.timerInterval);
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
        
        this.generateSudoku();
        this.renderBoard();
        this.updateMistakes();
        this.hideMessage();
        
        this.showMessage('¡Nuevo juego iniciado!', 'info');
    }

    updateTimer() {
        if (!this.startTime) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        
        document.getElementById('time').textContent = `${minutes}:${seconds}`;
    }

    updateMistakes() {
        document.getElementById('mistakes-count').textContent = this.mistakes;
    }

    checkSolution() {
        if (this.isSolved) {
            this.showMessage('¡Ya has completado el Sudoku!', 'info');
            return;
        }

        let hasErrors = false;
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                const userValue = this.userBoard[row][col];
                
                if (userValue !== 0 && userValue !== this.solution[row][col]) {
                    cell.classList.add('error');
                    hasErrors = true;
                }
            }
        }
        
        if (hasErrors) {
            this.showMessage('Hay errores en tu solución.', 'error');
        } else {
            this.showMessage('¡Tu solución es correcta hasta ahora!', 'success');
        }
    }

    solvePuzzle() {
        if (this.isSolved) return;
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.userBoard[row][col] = this.solution[row][col];
            }
        }
        
        this.renderBoard();
        this.gameWon();
        this.showMessage('Sudoku resuelto automáticamente.', 'info');
    }

    showMessage(text, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.className = `message ${type} show`;
        
        setTimeout(() => {
            this.hideMessage();
        }, 3000);
    }

    hideMessage() {
        const messageElement = document.getElementById('message');
        messageElement.classList.remove('show');
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});