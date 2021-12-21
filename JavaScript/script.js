"use strict";

const gameStartBtn = document.getElementById("game-start-btn");
const gameBoard = document.getElementById('game-board');
const playerANameDisplay = document.getElementById('playerA-name-display');
const playerBNameDisplay = document.getElementById('playerB-name-display');
const turnPlayerDisplay = document.getElementById('turn-player-display');

const winnerDecisionArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//プレイヤーの名前を取得する関数
gameStartBtn.addEventListener('click', () => {
    const playerANameAdd = document.getElementById('playerA-name');
    const playerBNameAdd = document.getElementById('playerB-name');

    if (playerANameAdd.value === '') {
        alert('プレイヤーAの名前を入力してください。');
        playerANameAdd.focus();
        return;

    } else if (playerBNameAdd.value === '') {
        alert('プレイヤーBの名前を入力してください。');
        playerBNameAdd.focus();
        return;

    } else if (playerANameAdd.value === playerBNameAdd.value) {
        alert('プレイヤーAとプレイヤーBの名前は別にしてください。');
        playerBNameAdd.focus();
        return;

    } else {
        const playerAName = playerANameAdd.value;
        const playerBName = playerBNameAdd.value;
        document.getElementById('players-name-add-form').style.display = 'none';
        gameBoard.style.display = 'block';
        decidePlayFirst(playerAName, playerBName);
    }
});

//先行・後攻を決めて、それを表示する関数
const decidePlayFirst = (playerAName, playerBName) => {
    const players = [playerAName, playerBName];
    const playFirstPlayer = players[Math.floor(Math.random() * players.length)];
    const playSecondPlayer = players.find(n => n !== playFirstPlayer);
    const turnPlayer = playFirstPlayer;
    alert(`先行は${playFirstPlayer}様です。`);

    playerANameDisplay.innerHTML = `${playFirstPlayer}様:O`;
    playerBNameDisplay.innerHTML = `${playSecondPlayer}様:X`;
    turnPlayerDisplay.innerHTML = `${playFirstPlayer}様のターンです。`;
    createBtn(playFirstPlayer, playSecondPlayer, turnPlayer);
};

//セル内にボタンを作成する処理
const createBtn = (playFirstPlayer, playSecondPlayer, turnPlayer) => {
    const rowXY = 3;

    for (let i = 0; i < rowXY; i++) {
        const tr = document.createElement('tr');
        gameBoard.appendChild(tr);

        for (let j = 0; j < rowXY; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);

            const btn = document.createElement('button');
            tr.appendChild(btn);

            btn.addEventListener('click', () => {
                if (btn.innerHTML === "O") {
                    alert(`このマスは${playFirstPlayer}様が既に選択しています。`);

                } else if (btn.innerHTML === "X") {
                    alert(`このマスは${playSecondPlayer}様が既に選択しています。`);

                } else if (turnPlayer === playFirstPlayer) {
                    btn.innerHTML = "O";
                    turnPlayer = playSecondPlayer;
                    turnPlayerDisplay.innerHTML = `${playSecondPlayer}様のターンです。`;
                    winnerDecisionArr[i][j] = 1;
                    winnerDecision(playFirstPlayer, playSecondPlayer);

                } else if (turnPlayer === playSecondPlayer) {
                    btn.innerHTML = "X";
                    turnPlayer = playFirstPlayer;
                    turnPlayerDisplay.innerHTML = `${playFirstPlayer}様のターンです。`;
                    winnerDecisionArr[i][j] = 10;
                    winnerDecision(playFirstPlayer, playSecondPlayer);
                }
            })
        }
    }
}

//勝者の判定
const winnerDecision = (playFirstPlayer, playSecondPlayer) => {
    let row1Sum = 0, row2Sum = 0, row3Sum = 0;
    let col1Sum = 0, col2Sum = 0, col3Sum = 0;
    let topLeftFromBottomRightSum = 0, topRightFromBottomLeftSum = 0;

    row1Sum = winnerDecisionArr[0].reduce((previousValue, currentValue) => previousValue + currentValue);
    row2Sum = winnerDecisionArr[1].reduce((previousValue, currentValue) => previousValue + currentValue);
    row3Sum = winnerDecisionArr[2].reduce((previousValue, currentValue) => previousValue + currentValue);
    col1Sum = winnerDecisionArr[0][0] + winnerDecisionArr[1][0] + winnerDecisionArr[2][0];
    col2Sum = winnerDecisionArr[0][1] + winnerDecisionArr[1][1] + winnerDecisionArr[2][1];
    col3Sum = winnerDecisionArr[0][2] + winnerDecisionArr[1][2] + winnerDecisionArr[2][2];
    topLeftFromBottomRightSum = winnerDecisionArr[0][0] + winnerDecisionArr[1][1] + winnerDecisionArr[2][2];
    topRightFromBottomLeftSum = winnerDecisionArr[0][2] + winnerDecisionArr[1][1] + winnerDecisionArr[2][0];

    //const test = {"横列1":row1Sum, "横列2":row2Sum, "横列3":row3Sum, "縦列1":col1Sum, "縦列2":col2Sum, "縦列3":col3Sum, "左→右":topLeftFromBottomRightSum, "右→左":topRightFromBottomLeftSum};
    const test = [row1Sum, row2Sum, col1Sum, col2Sum, col3Sum, topLeftFromBottomRightSum, topRightFromBottomLeftSum];

    if (test.find(element => element === 3)) {
        alert(`${playFirstPlayer}の勝ちです`);

    } else if (test.find(element => element === 30)) {
        alert(`${playSecondPlayer}の勝ちです`);
        
    } else {
        return
    }
}