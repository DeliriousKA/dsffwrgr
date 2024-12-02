const player = document.getElementById('player');
const gameElements = document.getElementById('game-elements');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

let score = 0;
let lives = 3;

// Гравець слідує за мишею
document.addEventListener('mousemove', (e) => {
    player.style.left = `${e.pageX}px`;
    player.style.top = `${e.pageY}px`;
});

// Додавання блискавок
function spawnLightning() {
    const lightning = document.createElement('div');
    lightning.classList.add('lightning');

    // Випадкова позиція
    const posX = Math.random() * (window.innerWidth - 50);
    const posY = Math.random() * (window.innerHeight - 50);

    lightning.style.left = `${posX}px`;
    lightning.style.top = `${posY}px`;

    gameElements.appendChild(lightning);

    // Якщо блискавка не зібрана, зникає
    setTimeout(() => {
        if (lightning.parentElement) lightning.remove();
    }, 3000);

    // Збір блискавки
    lightning.addEventListener('mouseenter', () => {
        score++;
        updateScore();
        lightning.remove();
    });
}

// Додавання атак
function spawnAttack() {
    const attack = document.createElement('div');
    attack.classList.add('attack');

    // Початкова позиція зверху
    const posX = Math.random() * (window.innerWidth - 60);
    attack.style.left = `${posX}px`;
    attack.style.top = `-60px`;

    gameElements.appendChild(attack);

    // Рух атаки вниз
    const attackInterval = setInterval(() => {
        const currentTop = parseInt(attack.style.top);
        attack.style.top = `${currentTop + 5}px`;

        // Якщо атака виходить за межі екрана, зникає
        if (currentTop > window.innerHeight) {
            attack.remove();
            clearInterval(attackInterval);
        }

        // Перевірка на зіткнення
        if (isColliding(player, attack)) {
            lives--;
            updateLives();
            attack.remove();
            clearInterval(attackInterval);
        }
    }, 30);
}

// Перевірка на зіткнення
function isColliding(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

// Оновлення очок
function updateScore() {
    scoreDisplay.textContent = score;
}

// Оновлення життів
function updateLives() {
    livesDisplay.textContent = lives;
    if (lives <= 0) {
        alert(`Гра завершена! Ваш рахунок: ${score}`);
        resetGame();
    }
}

// Скидання гри
function resetGame() {
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
    gameElements.innerHTML = '';
}

// Запуск генерацій
setInterval(spawnLightning, 2000);
setInterval(spawnAttack, 3000);