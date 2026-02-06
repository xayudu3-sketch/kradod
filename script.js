const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `สถิติสูงสุด: ${highScore}`;

let gameSpeed = 1.5; // ความเร็วเริ่มต้น (วินาที)
let isGameOver = false;

// ฟังก์ชันกระโดด
function jump() {
    if (!character.classList.contains("animate-jump") && !isGameOver) {
        character.classList.add("animate-jump");
        setTimeout(() => {
            character.classList.remove("animate-jump");
        }, 500);
    }
}

// ควบคุมการกด
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") jump();
});
document.addEventListener("touchstart", jump); // รองรับมือถือ

// ตรวจจับการชนและอัปเดตเกม
const gameLoop = setInterval(() => {
    if (isGameOver) return;

    let charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // ตรวจสอบการชน
    if (blockLeft < 90 && blockLeft > 50 && charTop >= 150) {
        isGameOver = true;
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
        
        if (score > highScore) {
            localStorage.setItem("highScore", score);
            alert(`New High Score! คะแนนของคุณคือ: ${score}`);
        } else {
            alert(`Game Over! คะแนนของคุณคือ: ${score}`);
        }
        location.reload();
    }

    // เมื่ออุปสรรควิ่งผ่านไป (นับคะแนน)
    // เราจะใช้การเช็คตำแหน่งเพื่อเพิ่มคะแนนครั้งเดียวต่อรอบ
}, 10);

// เพิ่มคะแนนและความยาก
const scoreTracker = setInterval(() => {
    if (isGameOver) return;
    
    score++;
    scoreElement.innerText = `คะแนน: ${score}`;

    // --- ระดับความยาก ---
    // ทุกๆ 5 คะแนน จะวิ่งเร็วขึ้น 0.1 วินาที (ตันที่ 0.7 วินาที)
    if (score % 5 === 0 && gameSpeed > 0.7) {
        gameSpeed -= 0.05;
        obstacle.style.animationDuration = `${gameSpeed}s`;
    }

    // --- เปลี่ยนสีตัวละคร ---
    if (score >= 30) {
        character.style.backgroundColor = "#747d8c"; // สีเทาเข้ม (Level Max)
    } else if (score >= 20) {
        character.style.backgroundColor = "#ffa502"; // สีส้ม (Level 3)
    } else if (score >= 10) {
        character.style.backgroundColor = "#2ed573"; // สีเขียว (Level 2)
    }
}, 1000); // เพิ่มคะแนนทุก 1 วินาทีที่รอดชีวิต
