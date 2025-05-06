// Lấy nút
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Khi kéo trang xuống 100px, hiện nút
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Khi click nút, cuộn mượt về đầu trang
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

onclick = "event.preventDefault()";
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
const bannerLeft = document.getElementById("bannerLeft");
const bannerRight = document.getElementById("bannerRight");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY === 0) {
    // Ở đầu trang, đặt lại vị trí bình thường
    bannerLeft.style.top = "0px";
    bannerLeft.style.left = "0px";

    bannerRight.style.top = "0px";
    bannerRight.style.right = "0px";
  } else if (scrollY >= 80) {
    // Khi cuộn xuống đủ sâu, đẩy banner lên 80px
    bannerLeft.style.top = "-80px";
    bannerLeft.style.left = "20px";

    bannerRight.style.top = "-80px";
    bannerRight.style.right = "20px";
  } else {
    // Trong khoảng cuộn nhỏ hơn 80px (chưa tới mức "ẩn")
    bannerLeft.style.top = "0px";
    bannerLeft.style.left = "10px";

    bannerRight.style.top = "0px";
    bannerRight.style.right = "10px";
  }

  // Luôn giữ position cố định
  bannerLeft.style.position = "fixed";
  bannerRight.style.position = "fixed";
});
const mic = document.getElementById("mic");
const voiceSearch = document.getElementById("voiceSearch");
const ketQua = document.getElementById("ketQua");

// Kiểm tra xem trình duyệt có hỗ trợ Speech Recognition API không
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
  recognition.continuous = false; // Nhận diện một lần khi dừng nói
  recognition.interimResults = false; // Không hiển thị kết quả tạm thời

  mic.addEventListener("click", () => {
    recognition.start();
    voiceSearch.placeholder = "Đang nghe...";
  });

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    voiceSearch.value = transcript;
    voiceSearch.placeholder = "🔍 Tìm kiếm cái bạn cần!";
    ketQua.textContent = "Bạn đã nói: " + transcript;
    // Thêm logic tìm kiếm ở đây dựa trên 'transcript'
    console.log("Kết quả nhận diện:", transcript);
  };

  recognition.onerror = function (event) {
    console.error("Lỗi nhận diện giọng nói:", event.error);
    ketQua.textContent = "Có lỗi xảy ra khi nhận diện giọng nói.";
    voiceSearch.placeholder = "🔍 Tìm kiếm cái bạn cần!";
  };

  recognition.onend = function () {
    console.log("Nhận diện giọng nói đã kết thúc.");
    voiceSearch.placeholder = "🔍 Tìm kiếm cái bạn cần!";
  };
} else {
  ketQua.textContent =
    "Trình duyệt của bạn không hỗ trợ Speech Recognition API.";
  mic.style.display = "none"; // Ẩn biểu tượng micro nếu không hỗ trợ
}
