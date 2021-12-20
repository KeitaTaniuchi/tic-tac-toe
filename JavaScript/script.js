"use strict";

const gameStartBtn = document.getElementById("game-start-btn");
const gameBoard = document.getElementById('game-board');
const playerANameDisplay = document.getElementById('playerA-name-display');
const playerBNameDisplay = document.getElementById('playerB-name-display');
const turnPlayerDisplay = document.getElementById('turn-player-display');

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
    let turnPlayer = playFirstPlayer;
    const playSecondPlayer = players.find(n => n !== playFirstPlayer);
    alert(`先行は${playFirstPlayer}様です。`);

    playerANameDisplay.innerHTML = `${playFirstPlayer}様:O`;
    playerBNameDisplay.innerHTML = `${playSecondPlayer}様:X`;
    turnPlayerDisplay.innerHTML = `${playFirstPlayer}様のターンです。`
    createBtn(playFirstPlayer, playSecondPlayer, turnPlayer);

};

const decideTurnPlayer = (btn ,playFirstPlayer, playSecondPlayer, turnPlayer) => {
    if (turnPlayer === playFirstPlayer) {
        turnPlayer = playSecondPlayer;
        test(btn, playFirstPlayer, playSecondPlayer, turnPlayer);
        console.log("1")

    } else {
        turnPlayer = playFirstPlayer;
        test(btn, playFirstPlayer, playSecondPlayer, turnPlayer);
        console.log("2")
    }
}


const createBtn = (playFirstPlayer, playSecondPlayer, turnPlayer) => {
    const rowXY = 3;

    for (let i = 1; i <= rowXY; i++) {
        const tr = document.createElement('tr');
        tr.id = `row ${i}`;
        gameBoard.appendChild(tr);

        for (let j = 1; j <= rowXY; j++) {
            const td = document.createElement('td');
            td.id = `cell ${i}-${j}`;
            tr.appendChild(td)

            const btn = document.createElement('button');
            tr.appendChild(btn);

            btn.addEventListener('click', () => {
                test(btn, playFirstPlayer, playSecondPlayer, turnPlayer);
                
            })
        }
    }
}

const test = (btn, playFirstPlayer, playSecondPlayer, turnPlayer) => {
    console.log(turnPlayer)
    if (btn.innerHTML === "O") {
        alert(`このマスは${playFirstPlayer}様が既に選択しています。`);

    } else if (btn.innerHTML === "X") {
        alert(`このマスは${playSecondPlayer}様が既に選択しています。`);

    } else if (turnPlayer === playFirstPlayer) {
        btn.innerHTML = "O"
        decideTurnPlayer(btn, playFirstPlayer, playSecondPlayer, turnPlayer);

    } else if (turnPlayer === playSecondPlayer) {
        btn.innerHTML = "X"
        decideTurnPlayer(btn, playFirstPlayer, playSecondPlayer, turnPlayer);
    }

}