// Elementos del DOM
const gameArea = document.getElementById('game-area');
const player = document.querySelector('#Player');
const beyonce = document.querySelector('#Beyonce');
const easyButtom = document.getElementById('easy-button');
const mediumButtom = document.getElementById('medium-button');
const hardButtom = document.getElementById('hard-button');
// Velocidades
const playerSpeed = 35;
let beyonceSpeed = 1;

// Posiciones iniciales
let isPlaying = false;
let playerPosition = { x: 0, y: 0 };
let beyoncePosition = { x: 300, y: 300 };

// Tiempo o puntaje
let score = 0;
let scoreInterval;

// Música
const music = document.getElementById('background-music');
const playButton = document.getElementById('play-music');
const pauseButton = document.getElementById('pause-music');

//colores

const colorPickerPlayer = document.getElementById('color-picker-player');
const colorPickerBackground = document.getElementById('color-picker-background');


// Detección de colisión
function detectCollision() {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x);
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y);
    if (deltaX <= 50 && deltaY <= 50) {
        if (confirm('¡Beyoncé te atrapó! Da las gracias para sobrevivir.')) {
            resetGame();
        } else {
            alert('Eres una víctima de Beyoncé.');
            isPlaying = false;
            losepage();
        }
    }
}

// Actualización de posiciones
function updatePosition() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

// Página de derrota
function losepage() {
    if (!isPlaying) {
        window.location.href = "losepage.html";
    }
}

// Movimiento de Beyoncé
function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed;
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed;
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed;
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed;
    }

    updatePosition();
    if (isPlaying) {
        detectCollision();
    }
}

// Movimiento del jugador
function movePlayer(event) {
    if (!isPlaying) return;

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y + player.offsetHeight < areaHeight) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x + player.offsetWidth < areaWidth) playerPosition.x += playerSpeed;
            break;
    }
    updatePosition();
}

// Reinicio del juego
function resetGame() {
    playerPosition = { x: 0, y: 0 };
    beyoncePosition = { x: 300, y: 300 };
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    isPlaying = true;
    updatePosition();
}

// Actualización del puntaje
function updateScore() {
    if (isPlaying) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}

// Inicio del juego
function startGame() {
    if (isPlaying) return;
    resetGame();
    isPlaying = true;

    clearInterval(scoreInterval);
    scoreInterval = setInterval(updateScore, 1000);
    gameLoop();
}

// Detener el juego
function stopGame() {
    isPlaying = false;
    clearInterval(scoreInterval);
}

// Ciclo del juego
function gameLoop() {
    if (!isPlaying) return;
    moveBeyonce();
    requestAnimationFrame(gameLoop);
}


// Cambia el color del jugador
colorPickerPlayer.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    player.style.backgroundColor = selectedColor;
});
colorPickerBackground.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    gameArea.style.backgroundColor = selectedColor;
});
// Control del volumen
const volumen = document.getElementById("volumen");
volumen.oninput = (e) => {
    const vol = e.target.value;
    music.volume = vol;
};


// Listeners
window.addEventListener('keydown', movePlayer);
window.addEventListener('load', () => {
    updatePosition();
    music.volume = 0.75;
    
});
playButton.addEventListener('click', () => music.play());
pauseButton.addEventListener('click', () => music.pause());

window.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
        stopGame();
    } else if (event.key === 's') {
        startGame();
    }
});
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('stop-button').addEventListener('click', stopGame);
easyButtom.addEventListener('click', () => {
    beyonceSpeed = 1;
    easyButtom.style.backgroundColor = 'green'
    mediumButtom.style.backgroundColor = 'yellow'
    hardButtom.style.backgroundColor = 'red'    
    console.log(beyonceSpeed)   
    startGame();
});
mediumButtom.addEventListener('click', () => {
    beyonceSpeed = 1.2;
    console.log(beyonceSpeed)   
    easyButtom.style.backgroundColor = 'blue'
    mediumButtom.style.backgroundColor = 'green'
    hardButtom.style.backgroundColor = 'red'    
    startGame();
});
hardButtom.addEventListener('click', () => {
    beyonceSpeed = 2;
    console.log(beyonceSpeed)   
    easyButtom.style.backgroundColor = 'blue'
    mediumButtom.style.backgroundColor = 'yellow'
    hardButtom.style.backgroundColor = 'green'    
    startGame();
});
