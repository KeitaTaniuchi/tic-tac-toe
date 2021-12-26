"use strict";

const gameBoard = document.getElementById('game-board');
const turnPlayerDisplay = document.getElementById('turn-player-display');
const information = document.getElementById('information');
const rowXY = 3;
const playFirstPlayerNum = 1;
const playSecondPlayerNum = 10;

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

    document.getElementById('playerA-name-display').innerHTML = `${playFirstPlayer}様`;
    document.getElementById('playerB-name-display').innerHTML = `${playSecondPlayer}様`;
    turnPlayerDisplay.innerHTML = `${playFirstPlayer}様のターンです。`;
    createBtn(playFirstPlayer, playSecondPlayer);
};

//セル内にボタンを作成する処理
const createBtn = (playFirstPlayer, playSecondPlayer) => {
    let turnPlayer = playFirstPlayer;
    let btnPushCounter = 0;
    let winnerDecisionMultiArr = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (let i = 0; i < rowXY; i++) {
        const tr = document.createElement('tr');
        gameBoard.appendChild(tr);

        for (let j = 0; j < rowXY; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);

            const btn = document.createElement('button');
            td.appendChild(btn);

            btn.addEventListener('click', () => {
                if (information.innerHTML.includes('勝利') || information.innerHTML.includes('引き分け')) {
                    return

                } else if (btn.innerHTML === "O") {
                    information.innerHTML = `このマスは${playFirstPlayer}様が既に選択しています。`;
                    information.style.color = "red";

                } else if (btn.innerHTML === "X") {
                    information.innerHTML = `このマスは${playSecondPlayer}様が既に選択しています。`;
                    information.style.color = "red";

                } else if (turnPlayer === playFirstPlayer) {
                    information.innerHTML = "";
                    information.style.color = "";
                    btn.innerHTML = "O";
                    turnPlayer = playSecondPlayer;
                    turnPlayerDisplay.innerHTML = `${playSecondPlayer}様のターンです。`;
                    winnerDecisionMultiArr[i][j] = playFirstPlayerNum;
                    btnPushCounter++;
                    winnerDecision(playFirstPlayer, playSecondPlayer, btnPushCounter, winnerDecisionMultiArr);

                } else if (turnPlayer === playSecondPlayer) {
                    information.innerHTML = "";
                    information.style.color = "";
                    btn.innerHTML = "X";
                    turnPlayer = playFirstPlayer;
                    turnPlayerDisplay.innerHTML = `${playFirstPlayer}様のターンです。`;
                    winnerDecisionMultiArr[i][j] = playSecondPlayerNum;
                    btnPushCounter++;
                    winnerDecision(playFirstPlayer, playSecondPlayer, btnPushCounter, winnerDecisionMultiArr);
                }
            })
        }
    }
}

//勝者の判定
const winnerDecision = (playFirstPlayer, playSecondPlayer, btnPushCounter, winnerDecisionMultiArr) => {
    let row1Sum = 0, row2Sum = 0, row3Sum = 0;
    let col1Sum = 0, col2Sum = 0, col3Sum = 0;
    let topLeftFromBottomRightSum = 0, topRightFromBottomLeftSum = 0;
    let winnerDecisionArr = [row1Sum, row2Sum, row3Sum, col1Sum, col2Sum, col3Sum, topLeftFromBottomRightSum, topRightFromBottomLeftSum];

    winnerDecisionArr[0] = winnerDecisionMultiArr[0].reduce((previousValue, currentValue) => previousValue + currentValue);
    winnerDecisionArr[1] = winnerDecisionMultiArr[1].reduce((previousValue, currentValue) => previousValue + currentValue);
    winnerDecisionArr[2] = winnerDecisionMultiArr[2].reduce((previousValue, currentValue) => previousValue + currentValue);
    winnerDecisionArr[3] = winnerDecisionMultiArr[0][0] + winnerDecisionMultiArr[1][0] + winnerDecisionMultiArr[2][0];
    winnerDecisionArr[4] = winnerDecisionMultiArr[0][1] + winnerDecisionMultiArr[1][1] + winnerDecisionMultiArr[2][1];
    winnerDecisionArr[5] = winnerDecisionMultiArr[0][2] + winnerDecisionMultiArr[1][2] + winnerDecisionMultiArr[2][2];
    winnerDecisionArr[6] = winnerDecisionMultiArr[0][0] + winnerDecisionMultiArr[1][1] + winnerDecisionMultiArr[2][2];
    winnerDecisionArr[7] = winnerDecisionMultiArr[0][2] + winnerDecisionMultiArr[1][1] + winnerDecisionMultiArr[2][0];

    if (winnerDecisionArr.find(element => element === rowXY * playFirstPlayerNum)) {
        turnPlayerDisplay.style.display = 'none';
        information.innerHTML = `${playFirstPlayer}様の勝利です。`;
        restartBtnDisplay(playFirstPlayer, playSecondPlayer);

    } else if (winnerDecisionArr.find(element => element === rowXY * playSecondPlayerNum)) {
        turnPlayerDisplay.style.display = 'none';
        information.innerHTML = `${playSecondPlayer}様の勝利です。`;
        restartBtnDisplay(playFirstPlayer, playSecondPlayer);

    } else if (btnPushCounter === rowXY ** 2) {
        turnPlayerDisplay.style.display = 'none';
        information.innerHTML = "引き分けです";
        restartBtnDisplay(playFirstPlayer, playSecondPlayer);
    }
}

//リスタートボタンを押した時の処理
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