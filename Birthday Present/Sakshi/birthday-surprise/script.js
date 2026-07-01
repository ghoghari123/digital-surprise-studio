// =====================
// WORD SEARCH DATA
// =====================

const words = [
    "FRIEND",
    "LOVE",
    "PARTY",
    "CAKE",
    "MEMORY",
    "BIRTHDAY"
];

const board = [
    "FRIENDABCD",
    "XXLOVEYYY",
    "PARTYZZ",
    "CAKEXX",
    "MEMORYYYY",
    "BIRTHDAYX",
    "CDEFGHI",
    "KLMNOPQ",
    "STUVWXYZA",
    "CDPARTY"
];

// =====================
// VARIABLES
// =====================

const grid =
    document.getElementById("wordGrid");

let selected = [];
let foundWords = 0;

// =====================
// CREATE GRID
// =====================

if (grid) {

    board.forEach(row => {

        [...row].forEach(letter => {

            const div =
                document.createElement("div");

            div.className = "cell";
            div.innerText = letter;

            div.addEventListener(
                "click",
                () => selectLetter(div)
            );

            grid.appendChild(div);
        });

    });

}

// =====================
// SELECT LETTER
// =====================

function selectLetter(cell) {

    if (
        cell.classList.contains("found")
    ) return;

    cell.classList.add(
        "selected"
    );

    selected.push({
        element: cell,
        letter: cell.innerText
    });

    checkWord();
}

// =====================
// CHECK WORD
// =====================

function checkWord() {

    const current =
        selected
            .map(x => x.letter)
            .join("");

    // FOUND
    if (words.includes(current)) {

        selected.forEach(x => {

            x.element.classList
                .remove("selected");

            x.element.classList
                .add("found");
        });

        const item =
            document.querySelector(
                `[data-word="${current}"]`
            );

        if (item) {

            item.classList.add(
                "done"
            );
        }

        foundWords++;

        const count =
            document.getElementById(
                "foundCount"
            );

        if (count)
            count.innerText =
                foundWords;

        selected = [];

        checkGameComplete();

        return;
    }

    // TOO LONG
    if (current.length > 10) {

        clearSelection();
    }
}

// =====================
// CLEAR SELECTION
// =====================

function clearSelection() {

    selected.forEach(x => {

        x.element.classList
            .remove("selected");
    });

    selected = [];
}

// =====================
// CHECK COMPLETE
// =====================

function checkGameComplete() {

    if (
        foundWords === words.length
    ) {

        clearInterval(timer);

        setTimeout(() => {

            document
                .getElementById(
                    "winPopup"
                )
                .style.display =
                "flex";

        }, 500);
    }
}

// =====================
// TIMER
// =====================

let seconds = 180;

const timer =
    setInterval(() => {

        const min =
            Math.floor(
                seconds / 60
            );

        const sec =
            seconds % 60;

        const timerText =
            document.getElementById(
                "timer"
            );

        if (timerText) {

            timerText.innerText =
                `${String(min)
                    .padStart(2, '0')}:${String(sec)
                        .padStart(2, '0')}`;
        }

        seconds--;

        if (seconds < 0) {

            clearInterval(
                timer
            );

            alert(
                "⏰ Time's Up!"
            );

            location.reload();
        }

    }, 1000);

// =====================
// NEXT BUTTON
// =====================

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "./secretcode.html";
        }
    );
}

// ======================
// SECRET CODE PAGE
// ======================

const verifyBtn =
    document.getElementById(
        "verifyBtn"
    );

if (verifyBtn) {

    verifyBtn.addEventListener(
        "click",
        verifyCode
    );
}

function verifyCode() {

    const code =
        document
            .getElementById(
                "secretInput"
            )
            .value
            .trim()
            .toUpperCase();

    const error =
        document.getElementById(
            "errorMsg"
        );

    const success =
        document.getElementById(
            "successMsg"
        );

    error.style.display =
        "none";

    success.style.display =
        "none";

    if (
        code ===
        "BESTFRIEND2025"
    ) {

        success.style.display =
            "block";

        setTimeout(() => {

            window.location.href =
                "./puzzle.html";

        }, 2000);

    }
    else {

        error.style.display =
            "block";
    }
}

// ======================
// 8×8 IMAGE PUZZLE
// ======================

const puzzleBoard = document.getElementById("puzzleBoard");

if (puzzleBoard) {

    const SIZE = 4;

    // YOUR IMAGE
    const IMAGE = "../assets/images/birthday.jpg";

    let pieces = [];
    let selected = null;

    // create solved puzzle data
    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

            pieces.push({
                x: x,
                y: y
            });

        }
    }

    // initial shuffle
    shufflePuzzle();
    renderPuzzle();

    // ======================
    // RENDER
    // ======================

    function renderPuzzle() {

        puzzleBoard.innerHTML = "";

        pieces.forEach((piece, index) => {

            const tile =
                document.createElement("div");

            tile.className = "piece";

            if (selected === index) {
                tile.classList.add(
                    "selected"
                );
            }

            tile.style.backgroundImage =
                `url(${IMAGE})`;

            tile.style.backgroundSize =
                `${SIZE * 100}% ${SIZE * 100}%`;

            tile.style.backgroundPosition =
                `${piece.x * 100 / (SIZE - 1)}%
                 ${piece.y * 100 / (SIZE - 1)}%`;

            tile.addEventListener(
                "click",
                () => selectPiece(index)
            );

            puzzleBoard.appendChild(tile);
        });
    }


    // ======================
    // SELECT
    // ======================

    function selectPiece(index) {

        // પ્રથમ piece select
        if (selected === null) {

            selected = index;

            renderPuzzle();

            return;
        }

        // એ જ piece ફરી click થાય
        if (selected === index) {

            selected = null;

            renderPuzzle();

            return;
        }

        // swap
        let temp =
            pieces[selected];

        pieces[selected] =
            pieces[index];

        pieces[index] =
            temp;

        // reset
        selected = null;

        renderPuzzle();

        checkWin();
    }
    // ======================
    // SHUFFLE
    // ======================

    function shufflePuzzle() {

        for (let i = 0; i < 300; i++) {

            const a =
                Math.floor(
                    Math.random() *
                    pieces.length
                );

            const b =
                Math.floor(
                    Math.random() *
                    pieces.length
                );

            [
                pieces[a],
                pieces[b]
            ] =
                [
                    pieces[b],
                    pieces[a]
                ];
        }
    }

    // ======================
    // WIN CHECK
    // ======================

    function checkWin() {

        const solved =
            pieces.every(
                (piece, index) => {

                    const row =
                        Math.floor(
                            index / SIZE
                        );

                    const col =
                        index % SIZE;

                    return (
                        piece.x === col &&
                        piece.y === row
                    );
                }
            );

        if (solved) {

            const popup =
                document.getElementById(
                    "puzzlePopup"
                );

            if (popup) {

                popup.style.display =
                    "flex";
            }
        }
    }

    // ======================
    // SHUFFLE BUTTON
    // ======================

    const shuffleBtn =
        document.getElementById(
            "shuffleBtn"
        );

    if (shuffleBtn) {

        shuffleBtn.addEventListener(
            "click",
            () => {

                selected = null;

                shufflePuzzle();

                renderPuzzle();
            }
        );
    }

    // ======================
    // FINISH BUTTON
    // ======================

    const finishBtn =
        document.getElementById(
            "finishBtn"
        );

    if (finishBtn) {

        finishBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "./final.html";
            }
        );
    }

    // =====================
    // 30 MIN TIMER
    // =====================

    let timeLeft = 1800; // 30 minutes

    const timerDisplay =
        document.getElementById(
            "puzzleTimer"
        );

    const puzzleTimer =
        setInterval(() => {

            const minutes =
                Math.floor(
                    timeLeft / 60
                );

            const seconds =
                timeLeft % 60;

            if (timerDisplay) {

                timerDisplay.innerText =
                    `${String(minutes)
                        .padStart(2, '0')}:${String(seconds)
                        .padStart(2, '0')
                    }`;
            }

            timeLeft--;

            // time finished
            if (timeLeft < 0) {

                clearInterval(
                    puzzleTimer
                );

                alert(
                    "⏰ Time's Up!\nTry Again ❤️"
                );

                location.reload();
            }

        }, 1000);
}