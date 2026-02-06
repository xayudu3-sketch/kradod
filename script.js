const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");
const startScreen = document.getElementById("start-screen");

let score = 0;
let isGameOver = true;
let gameSpeed = 1.5;

// แสดง High Score จากเครื่อง
let highScore = localStorage.getItem("jumpHighScore") || 0;
bestScoreElement.innerText = highScore;

function startGame() {
    isGameOver = false;
    score = 0;
    gameSpeed = 1.5;
    scoreElement.innerText = "คะแนน: 0";
    startScreen.style.display = "none";
    
    obstacle.style.display = "block";
    obstacle.style.animation = `move ${gameSpeed}s infinite linear`;

    // เริ่มระบบนับคะแนนและความยาก
    startScoring();
}

function jump() {
    if (!character.classList.contains("animate-jump") && !isGameOver) {
        character.classList.add("animate-jump");
        setTimeout(() => {
            character.classList.remove("animate-jump");
        }, 500);
    }
}

// ควบคุมการเล่น
document.addEventListener("keydown", (e) => { if (e.code === "Space") jump(); });
document.addEventListener("touchstart", jump);

function startScoring() {
    const scoreInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(scoreInterval);
            return;
        }
        score++;
        scoreElement.innerText = `คะแนน: ${score}`;

        // เพิ่มความยากทุกๆ 5 คะแนน
        if (score % 5 === 0 && gameSpeed > 0.7) {
            gameSpeed -= 0.1;
            obstacle.style.animationDuration = `${gameSpeed}s`;
        }

        // เปลี่ยนสีตัวละครตามเลเวล
        if (score >= 30) character.style.backgroundColor = "#1e3799"; // Blue
        else if (score >= 20) character.style.backgroundColor = "#f6b93b"; // Yellow
        else if (score >= 10) character.style.backgroundColor = "#78e08f"; // Green
    }, 1000);
}

// ตรวจจับการชน
const checkCollision = setInterval(() => {
    if (isGameOver) return;

    let charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // โซนที่เกิดการชน
    if (blockLeft < 90 && blockLeft > 50 && charTop >= 150) {
        endGame();
    }
}, 10);

function endGame() {
    isGameOver = true;
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
    
    if (score > highScore) {
        localStorage.setItem("jumpHighScore", score);
        alert(`สุดยอด! สถิติใหม่: ${score}`);
    } else {
        alert(`จบเกม! คะแนนของคุณคือ: ${score}`);
    }
    
    location.reload(); // รีเซ็ตเกมกลับหน้าแรก
}
