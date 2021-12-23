"use strict";

const gameBoard = document.getElementById('game-board');
const turnPlayerDisplay = document.getElementById('turn-player-display');
const information = document.getElementById('information');

const winnerDecisionArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//プレイヤーの名前を取得する関数
document.getElementById("game-start-btn").addEventListener('click', () => {
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
        decidePlayFirst(playerAName, playerBName);
    }
});

//先行・後攻を決めて、それを表示する関数
const decidePlayFirst = (playerAName, playerBName) => {
    document.getElementById('players-name-add-form').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';

    const players = [playerAName, playerBName];
    const playFirstPlayer = players[Math.floor(Math.random() * players.length)];
    const playSecondPlayer = players.find(n => n !== playFirstPlayer);
    alert(`先行は${playFirstPlayer}様です。`);

    document.getElementById('playerA-name-display').innerHTML = `${playFirstPlayer}様:O`;
    document.getElementById('playerB-name-display').innerHTML = `${playSecondPlayer}様:X`;
    turnPlayerDisplay.innerHTML = `${playFirstPlayer}様のターンです。`;
    createBtn(playFirstPlayer, playSecondPlayer);
};

//セル内にボタンを作成する処理
const createBtn = (playFirstPlayer, playSecondPlayer) => {
    const rowXY = 3;
    let turnPlayer = playFirstPlayer;

    for (let i = 0; i < rowXY; i++) {
        const tr = document.createElement('tr');
        gameBoard.appendChild(tr);

        for (let j = 0; j < rowXY; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);

            const btn = document.createElement('button');
            td.appendChild(btn);

            btn.addEventListener('click', () => {
                if (information.innerHTML.includes('勝利')) {
                    return

                } else if (btn.innerHTML === "O") {
                    information.innerHTML = `このマスは${playFirstPlayer}様が既に選択しています。`;
                    information.style.color = "red";


                } else if (btn.innerHTML === "X") {
                    information.innerHTML = `このマスは${playSecondPlayer}様が既に選択しています。`;
                    information.style.color = "red";

                } else if (turnPlayer === playFirstPlayer) {
                    information.innerHTML = '';
                    information.style.color = "";

                    btn.innerHTML = "O";
                    turnPlayer = playSecondPlayer;
                    turnPlayerDisplay.innerHTML = `${playSecondPlayer}様のターンです。`;
                    winnerDecisionArr[i][j] = 1;
                    winnerDecision(playFirstPlayer, playSecondPlayer);

                } else if (turnPlayer === playSecondPlayer) {
                    information.innerHTML = '';
                    information.style.color = "";

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

    const winnerDecisionSumArr = [row1Sum, row2Sum, col1Sum, col2Sum, col3Sum, topLeftFromBottomRightSum, topRightFromBottomLeftSum];

    if (winnerDecisionSumArr.find(element => element === 3)) {
        information.innerHTML = `${playFirstPlayer}様の勝利です。`;
        btnHighlight(winnerDecisionSumArr);
        restartBtnDisplay(playFirstPlayer, playSecondPlayer);

    } else if (winnerDecisionSumArr.find(element => element === 30)) {
        information.innerHTML = `${playSecondPlayer}様の勝利です。`;
        btnHighlight(winnerDecisionSumArr);
        restartBtnDisplay(playFirstPlayer, playSecondPlayer);
    }
}

const btnHighlight = (winnerDecisionSumArr) => {
    if (winnerDecisionSumArr[0] === 3 || winnerDecisionSumArr[0] === 30) {

    }
}


const restartBtnDisplay = (playFirstPlayer, playSecondPlayer) => {
    const restartBtnContainer = document.getElementById('restart-btn-container');

    restartBtnContainer.style.display = 'block';

    document.getElementById('restart-btn').addEventListener('click', () => {
        if (document.getElementById('rename').checked) {
            location.reload();

        } else {
            while (gameBoard.lastChild) {
                gameBoard.removeChild(gameBoard.lastChild);
            }
            information.innerHTML = '';
            restartBtnContainer.style.display = 'none';

            decidePlayFirst(playFirstPlayer, playSecondPlayer);
        }
    })
}