const paymentForm = document.getElementById("payment-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const paymentOptions = document.querySelectorAll(
  'input[name="payment_method"]'
);
const bankInfoDiv = document.getElementById("bank-info");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const paymentError = document.getElementById("payment-error");
const successMessageDiv = document.getElementById("success-message");
const orderIdSpan = document.getElementById("order-id");
// Dùng để tạo mã đơn hàng
const orderId = Math.floor(Math.random() * 1000);
orderIdSpan.textContent = orderId;
// Click chuột dể chọn cách thanh toán
paymentOptions.forEach((option) => {
  option.addEventListener("change", function () {
    bankInfoDiv.style.display = this.value === "bank" ? "block" : "none";
  });
});

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault(); //tránh reload lại trang
  let isValid = true; //Kiểm tra form có điền đầy đủ và đúng hay k
  //Xóa các thông tin khi nhấn nút gửi
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  paymentError.textContent = "";
  successMessageDiv.style.display = "none";

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Vui lòng nhập họ và tên.";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Vui lòng nhập email.";
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "Email không hợp lệ.";
    isValid = false;
  }

  if (phoneInput.value.trim() === "") {
    phoneError.textContent = "Vui lòng nhập số điện thoại.";
    isValid = false;
  } else if (!isValidPhone(phoneInput.value.trim())) {
    phoneError.textContent = "Số điện thoại không hợp lệ.";
    isValid = false;
  }

  let paymentSelected = false;
  for (const option of paymentOptions) {
    if (option.checked) {
      paymentSelected = true;
      break;
    }
  }
  if (!paymentSelected) {
    paymentError.textContent = "Vui lòng chọn phương thức thanh toán.";
    isValid = false;
  }

  if (isValid) {
    successMessageDiv.style.display = "block";
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: document.getElementById("address").value,
      payment_method: document.querySelector(
        'input[name="payment_method"]:checked'
      ).value,
      order_id: orderId,
    });
    // Xử lý thanh toán thực tế ở đây
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{10,11}$/;
  return phoneRegex.test(phone);
}
