const elAuthForm = document.getElementById("authForm");
const elFormMessage = document.getElementById("formMessage");
const elEmail = document.getElementById("email");
const elPassword = document.getElementById("password");
const elName = document.getElementById("name");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = elEmail.value.trim();
  const password = elPassword.value.trim();
  const name = elName.value.trim();
  const phone = elPhone.value.trim();
  const address = elAddress.value.trim();

  const data = { name, email, password, phone, address };
  console.log(data);

  API.post("users/register", data)
    .then((response) => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Đăng ký thất bại, vui lòng nhập đúng thông tin!</div>`;
    });
});
