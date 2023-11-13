const elAuthForm = document.getElementById("authForm");
const elFormMessage = document.getElementById("formMessage");
const elName = document.getElementById("name");
const elEmail = document.getElementById("email");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");

API.callWithToken()
  .get("auth/me")
  .then((response) => {
    const data = response.data.data;
    elEmail.value = data.email;
    elName.value = data.name;
    elPhone.value = data.phone;
    elAddress.value = data.address;
  })
  .catch((error) => {
    window.location.href = "index.html";
  });

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get value from Form - Using FormData
  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);
  console.log(data);
  API.callWithToken()
    .put("auth/update", data)
    .then((response) => {
      elFormMessage.innerHTML = /*html*/ `
      <div class="alert alert-success" role="alert">
      Cập nhập thông tin thành công
      </div>`;
    })
    .catch((error) => {
      const errors = error.response.data.errors;

      showFormErrorsMessage(errors, elFormMessage);
    });
});
