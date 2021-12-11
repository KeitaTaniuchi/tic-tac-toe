"use strict";

const gameStartBtn = document.getElementById("game-start-btn");

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
        const players = [playerAName, playerBName];
        document.getElementById('players-name-add-form').style.display = 'none';
        document.getElementById('game-board').style.display = 'block';
        decidePlayFirst(players);
    }
});

//先行・後攻を決めて、それを表示する関数
const decidePlayFirst = (players) => {
    const playFirstPlayer = players[Math.floor(Math.random() * players.length)];
    alert(`先行は${playFirstPlayer}様です。` );
};