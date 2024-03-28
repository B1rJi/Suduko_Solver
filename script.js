// Define the Solution class
class Solution {
    constructor() {}

    // Function to check if a number can be placed at a given position
    valid(board, row, col, num) {
        // Check if the number exists in the current row or column
        for (let i = 0; i < 9; i++) {
            if (board[row][i] == num || board[i][col] == num) {
                return false;
            }
        }

        // Check if the number exists in the current 3x3 subgrid
        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Function to solve Sudoku using backtracking
    solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (this.valid(board, row, col, num.toString())) {
                            board[row][col] = num.toString();
                            if (this.solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}

// Function to create Sudoku board
function createSudokuBoard() {
    var sudokuBoardDiv = document.querySelector('.sudoku-board');
    for (var i = 0; i < 9; i++) {
        var rowDiv = document.createElement('div');
        rowDiv.classList.add('sudoku-row');
        for (var j = 0; j < 9; j++) {
            var cellDiv = document.createElement('div');
            cellDiv.classList.add('sudoku-cell');
            cellDiv.contentEditable = true;
            rowDiv.appendChild(cellDiv);
        }
        sudokuBoardDiv.appendChild(rowDiv);
    }
}

// Function to solve Sudoku
function solveSudoku() {
    var sudokuBoardDiv = document.querySelector('.sudoku-board');
    var cells = sudokuBoardDiv.querySelectorAll('.sudoku-cell');
    
    // Convert cell values to a 2D array
    var sudokuBoard = [];
    var row = [];
    cells.forEach((cell, index) => {
        row.push(cell.textContent || '.');
        if ((index + 1) % 9 === 0) {
            sudokuBoard.push(row);
            row = [];
        }
    });

    // Call the solveSudoku function from the Solution class
    var solution = new Solution();
    solution.solveSudoku(sudokuBoard);

    // Repopulate cells with solved Sudoku values
    var row = 0, col = 0;
    cells.forEach((cell, index) => {
        cell.textContent = sudokuBoard[row][col];
        col++;
        if (col === 9) {
            col = 0;
            row++;
        }
    });

    var solveButton = document.querySelector('.solve-button');
    solveButton.textContent = 'Solved';
    solveButton.classList.add('solved');
    solveButton.disabled = true;
}

// Event listener for Solve button
document.querySelector('.solve-button').addEventListener('click', solveSudoku);

// Create Sudoku board when the page loads
window.addEventListener('load', createSudokuBoard);

// Allow arrow key navigation through Sudoku cells
document.querySelector('.sudoku-board').addEventListener('keydown', function(e) {
    var cells = this.querySelectorAll('.sudoku-cell');
    var index = Array.from(cells).indexOf(document.activeElement);
    var numRows = 9;
    var numCols = 9;
    if (e.key === 'ArrowUp' && index >= numCols) {
        cells[index - numCols].focus();
    } else if (e.key === 'ArrowDown' && index < (numRows * numCols - numCols)) {
        cells[index + numCols].focus();
    } else if (e.key === 'ArrowLeft' && index % numCols !== 0) {
        cells[index - 1].focus();
    } else if (e.key === 'ArrowRight' && (index + 1) % numCols !== 0) {
        cells[index + 1].focus();
    }
});
