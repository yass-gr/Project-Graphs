document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chessboard');
    const statusElement = document.getElementById('status-text');
    const resetButton = document.getElementById('reset-btn');
    
    let startPos = null;
    let endPos = null;
    let isAnimating = false;
    
    // Initialize the chessboard (8x8)
    for (let row = 7; row >= 0; row--) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            if ((col + row) % 2 !== 0) {
                cell.classList.add('dark');
            } else {
                cell.classList.add('light');
            }
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }

    function handleCellClick(row, col) {
        if (isAnimating) return;

        if (!startPos) {
            startPos = [row, col];
            updateBoard();
            statusElement.innerHTML = `Start position selected. Now select <strong>end position</strong>.`;
            statusElement.classList.add('step-2');
        } else if (!endPos) {
            if (startPos[0] === row && startPos[1] === col) {
                startPos = null;
                updateBoard();
                statusElement.innerHTML = "Select <strong>start position</strong> for the Knight.";
                statusElement.classList.remove('step-2');
                return;
            }
            endPos = [row, col];
            updateBoard();
            statusElement.textContent = "Calculating shortest path...";
            setTimeout(() => calculateAndAnimatePath(), 150);
        }
    }

    function updateBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            cell.classList.remove('start', 'end', 'path', 'visited');
            cell.innerHTML = '';

            if (startPos && startPos[0] === row && startPos[1] === col) {
                cell.classList.add('start');
                cell.innerHTML = '<div class="knight-icon moving">♞</div>';
            } else if (endPos && endPos[0] === row && endPos[1] === col) {
                cell.classList.add('end');
                cell.innerHTML = '<div class="target-icon">🎯</div>';
            }
        });
    }

    function removeKnight() {
        document.querySelectorAll('.cell').forEach(cell => {
            if (cell.innerHTML.includes('♞')) {
                if (cell.innerHTML.includes('🎯')) {
                    cell.innerHTML = '<div class="target-icon">🎯</div>';
                } else {
                    cell.innerHTML = '';
                }
            }
        });
    }
    
    function addKnightTo(row, col) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
             cell.innerHTML += '<div class="knight-icon moving">♞</div>';
        }
    }

    async function calculateAndAnimatePath() {
        isAnimating = true;
        
        // Use global board instance created in knightTravails.js
        const path = board.knightMoves(startPos, endPos);
        
        statusElement.textContent = `Path found in ${path.length - 1} moves! Animating...`;
        statusElement.classList.remove('step-2');
        
        for (let i = 0; i < path.length; i++) {
            const [r, c] = path[i];
            
            removeKnight();
            addKnightTo(r, c);
            
            const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            if (cell && i > 0 && i < path.length - 1) {
                cell.classList.add('path');
            }
            
            if (i < path.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        
        statusElement.innerHTML = `Animation complete! <br>Shortest Path: <strong>${path.length - 1} moves</strong>.`;
        isAnimating = false;
    }

    resetButton.addEventListener('click', () => {
        startPos = null;
        endPos = null;
        isAnimating = false;
        updateBoard();
        document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('path'));
        statusElement.innerHTML = "Select <strong>start position</strong> for the Knight.";
    });
});
