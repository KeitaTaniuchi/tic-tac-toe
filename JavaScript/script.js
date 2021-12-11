"use strict";

//プレイヤーの名前を取得する関数
document.getElementById('players-name-add-btn').addEventListener('click', () => {
    const playerANameAdd = document.getElementById('playerA-name')
    const playerBNameAdd = document.getElementById('playerB-name')
    
    if (playerANameAdd.value === '') {
        alert('プレイヤーAの名前を入力してください。');
        return

    } else if (playerBNameAdd.value === '') {
        alert('プレイヤーBの名前を入力してください。');
        return
    
    } else if (playerANameAdd.value === playerBNameAdd.value) {
        alert('プレイヤーAとプレイヤーBの名前は別にしてください。');
        return

    } else {
        document.getElementById("game-start-btn").style.display ='block';
        const playerAName = playerANameAdd.value;
        const playerBName = playerBNameAdd.value;
    }
});