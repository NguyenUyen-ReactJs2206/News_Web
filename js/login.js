const elAuthForm = document.getElementById("authForm");
const elFormMessage = document.getElementById("formMessage");
const elEmail = document.getElementById("email");
const elPassword = document.getElementById("password");

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // const email = elEmail.value.trim();
  // const password = elPassword.value.trim();

  // const data = { email, password };
  // console.log(data);

  // Get value from Form - Using FormData
  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);

  API.post("auth/login", data)
    .then((response) => {
      console.log("rrrrrr", response);
      const token = response.data.access_token;
      localStorage.setItem("ACCESS_TOKEN", token);

      window.location.href = "index.html";
    })
    .catch((error) => {
      elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Thông tin đăng nhập không đúng, vui lòng thử lại!</div>`;
    });
});
