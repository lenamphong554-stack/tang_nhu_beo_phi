const messages = [
    "Mở khóa thành công rồi nhé ",
    "À thì cũng sắp đến 20/10 rồi...",
    "Nên là tớ muốn gửi vài lời tới Như ",
    "Chúc cậu luôn thật nhiều sức khỏe và luôn rạng rỡ",
    "Chúc cậu giữ mãi nụ cười tươi trên môi nhé ",
    "Happy Vietnamese Women's Day 20/10 "
];

let messageIndex = 0;
let charIndex = 0;
const messageElement = document.getElementById("message");
const bgMusic = document.getElementById("bg-music");
const vinylWrapper = document.getElementById("vinyl-wrapper");
const passwordOverlay = document.getElementById("password-overlay");
const passwordInput = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-msg");

// Playlist 3 bài nhạc
const playlist = ["bai1.mp3", "bai2.mp3", "bai3.mp3"];
let currentTrackIndex = 0;

// Hàm xử lý khi nhập đúng mật khẩu
function checkPassword() {
    const enteredPass = passwordInput.value.trim();
    
    if (enteredPass === "24/10/2013") {
        // 1. Ẩn khung mật khẩu mượt mà
        passwordOverlay.style.opacity = "0";
        setTimeout(() => {
            passwordOverlay.style.display = "none";
        }, 800);

        // 2. Phát nhạc (100% không bị trình duyệt chặn vì có tương tác bấm nút)
        bgMusic.play().catch(e => console.log(e));

        // 3. Đĩa nhạc tự động bay lên góc sau 1 giây
        setTimeout(() => {
            vinylWrapper.classList.add("move-to-corner");
        }, 1000);

        // 4. Bắt đầu chạy chữ chúc mừng
        setTimeout(() => {
            messageElement.innerHTML = "";
            typeWriter();
        }, 1800);

    } else {
        // Sai mật khẩu: Báo lỗi
        errorMsg.textContent = "Sai mật khẩu rồi kìa má ! Thử lại nha";
        passwordInput.style.borderColor = "#ff3366";
        setTimeout(() => {
            passwordInput.style.borderColor = "#444";
        }, 1500);
    }
}

// Bấm nút Mở khóa hoặc bấm phím Enter
submitBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkPassword();
    }
});

// Tự động chuyển bài khi phát hết
bgMusic.addEventListener("ended", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    bgMusic.src = playlist[currentTrackIndex];
    bgMusic.play().catch(e => console.log(e));
});

function typeWriter() {
    if (messageIndex < messages.length) {
        let currentText = messages[messageIndex];
        
        if (charIndex < currentText.length) {
            messageElement.innerHTML += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 70);
        } else {
            setTimeout(() => {
                messageElement.innerHTML = "";
                charIndex = 0;
                messageIndex++;
                typeWriter();
            }, 2500); 
        }
    }
}
