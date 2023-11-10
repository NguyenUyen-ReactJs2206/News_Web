const elAuthForm = document.getElementById("authForm");
const elPasswordCurrent = document.getElementById("password_current");
const elPassword = document.getElementById("password");
const elPasswordConfirm = document.getElementById("password_confirmation");
const elFormMessage = document.getElementById("formMessage");

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);
  console.log(data, "ddddđ");

  API.put("auth/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      elPasswordCurrent.value = "";
      elPassword.value = "";
      elPasswordConfirm.value = "";

      elFormMessage.innerHTML = /*html*/ `
      <div class="alert alert-success" role="alert">
        Thay đổi mật khẩu thành công
      </div>`;
    })
    .catch((error) => {
      const errors = error.response.data.errors;

      showFormErrorsMessage(errors, elFormMessage);
    });
});
