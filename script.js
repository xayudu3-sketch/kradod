const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
let score = 0;
let timeLeft = 30;

// ฟังก์ชันกระโดด
function jump() {
    if (!character.classList.contains("animate-jump")) {
        character.classList.add("animate-jump");
        setTimeout(() => {
            character.classList.remove("animate-jump");
        }, 500);
    }
}

// ตรวจสอบการกดปุ่ม (Spacebar หรือ Click)
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") jump();
});

// ระบบจับเวลาและนับคะแนน
const gameTimer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `เวลา: ${timeLeft}`;
    
    if (timeLeft <= 0) {
        clearInterval(gameTimer);
        alert(`หมดเวลา! คะแนนของคุณคือ: ${score}`);
        location.reload();
    }
}, 1000);

// ตรวจจับการชน (Collision Detection)
const checkDead = setInterval(() => {
    let charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // ถ้าอุปสรรคชนตัวละคร
    if (blockLeft < 90 && blockLeft > 50 && charTop >= 150) {
        alert("ชนแล้ว! เริ่มใหม่นะครับ");
        score = 0;
        location.reload();
    } else if (blockLeft < 50 && blockLeft > 45) {
        // นับคะแนนเมื่อกระโดดพ้น
        score++;
        document.getElementById("score").innerText = `คะแนน: ${score}`;
    }
}, 10);
