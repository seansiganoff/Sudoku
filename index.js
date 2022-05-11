
//////////////////////////////////// This is the game trigger function //////////////////////////////////////////////
function init() {
    let board = [[]]
    let j = 0;
    for(let i = 1; i <= 81; i++) {
        let value = document.getElementById(String(i)).value
        if(value === '') {
            board[j].push(0);
        } else {
            board[j].push(Number(value));
        }

        if(i % 9 === 0 && i < 81) {
            board.push([]);
            j++
        }
    }
    
    if(isValidSudoku(board)) {
        solveSudoku(0, 0, board);
        updateBoard(board);
    } else {
        for(let i= 1; i < 10; i++) {
            if(i === 4) {
                document.getElementById("row " + String(i)).innerHTML = "INVALID ENTRY!<br> Number's must be unique in the same<br> row, col and sub-grid 3 x 3"
            } else {
                document.getElementById("row " + String(i)).innerHTML = ' '
            }
            
        }
    }
}



//Solves the game.
function solveSudoku(i, j, board) {
    let row = i;
    let col = j;

    if(col === board[row].length) {
        row++;
        col = 0;
        if(row === board.length) return true;
    }

    if(board[row][col] === 0) return tryNumberAtPosition(row, col, board);

    return solveSudoku(row, col + 1, board);
}

//Helper function for solveSudoku() function. this function checks the rows, columns and subgrid to see if the value is valid.
function digitIsValid(value, row, col, board) {
    const rowIsValid = board[row].includes(value);
    const colIsValid = board.map(r => r[col]).includes(value);

    if(rowIsValid || colIsValid) return false;

    let subRow = Math.floor(row / 3) * 3;
    let subCol = Math.floor(col / 3) * 3;
    for(let rowIdx = 0; rowIdx < 3; rowIdx++) {
        for(let colIdx = 0; colIdx < 3; colIdx++) {
            let rowToCheck = subRow + rowIdx;
            let colToCheck = subCol + colIdx;
            let currentValue = board[rowToCheck][colToCheck];
            if(currentValue === value) return false;
        }
    }
    return true;
}

//Helper function for solveSudoku() function. this function runs all digits from 1 - 9 to see if they are valid.
function tryNumberAtPosition(row, col, board) {
    for(let digit = 1; digit < 10; digit++) {
        if(digitIsValid(digit, row, col, board)) {
            board[row][col] = digit;
            if(solveSudoku(row, col + 1, board)) return true;
        }
    }
    board[row][col]  = 0;
    return false
}

//Updates the game board on the user's end, to show the solved board.
function updateBoard(board) {
    for ( i = 1; i < 10; i++){
        var row = ""
        for (var j = 0; j < 9; j++){
            if (row == ""){
                row = row + String(board[i - 1][j])
            }
            else {
                row = row + "\xa0\xa0\xa0" + String(board[i - 1][j])
            }
        }
        document.getElementById("row " + String(i)).innerHTML = row
    }
}

function isValidSudoku(board) {
    for(let r = 0; r < 9; r++) {
        let row = {}, col = {}, box = {};
        for(let c = 0; c < 9; c++) {
            
            let rowIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            let colIdx = ((r % 3) * 3) + (c % 3);
            
            if(row[board[r][c]]) return false;
            if(col[board[c][r]]) return false;
            if(box[board[rowIdx][colIdx]]) return false;
            
            if(board[r][c] !== 0) row[board[r][c]] = true;
            if(board[c][r] !== 0) col[board[c][r]] = true;
            if(board[rowIdx][colIdx] !== 0) box[board[rowIdx][colIdx]] = true;
        }
    }
    return true;
};



