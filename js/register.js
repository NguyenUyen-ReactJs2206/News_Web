API.get("auth/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then(() => {
  window.location.href = "index.html";
});

const elAuthForm = document.getElementById("authForm");
const elFormMessage = document.getElementById("formMessage");
const elEmail = document.getElementById("email");
const elPassword = document.getElementById("password");
const elName = document.getElementById("name");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // const email = elEmail.value.trim();
  // const password = elPassword.value.trim();
  // const name = elName.value.trim();
  // const phone = elPhone.value.trim();
  // const address = elAddress.value.trim();

  // const data = { name, email, password, phone, address };

  // Get value from Form - Using FormData
  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);
  console.log(data);

  API.post("users/register", data)
    .then((responseRegister) => {
      const dataLogin = { email: data.email, password: data.password };
      API.post("auth/login", dataLogin).then((responseLogin) => {
        window.location.href = "index.html";
      });
    })
    .catch((err) => {
      const errors = err.responseRegister.errors;
      let errString = "";

      //loop object - Duyet qua object
      for (const property in errors) {
        errString += /*html*/ `<li>${errors[property]}</li>`;
      }

      elFormMessage.innerHTML = /*html*/ `
      <div class="alert alert-danger" role="alert">
        <ul>
          ${errString}
        </ul>
      </div>`;
    });
});
