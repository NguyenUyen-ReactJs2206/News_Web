API.callWithToken()
  .get("auth/me")
  .then((response) => {})
  .catch((error) => {
    window.location.href = "index.html";
  });

const elAuthForm = document.getElementById("authForm");
const elFormMessage = document.getElementById("formMessage");
const elThumb = document.getElementById("thumb");
const elThumPreview = document.getElementById("thumPreview");

elThumb.addEventListener("change", function () {
  if (elThumb.value) elThumPreview.src = elThumb.value;
});

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get value from Form - Using FormData
  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);
  console.log(data, "ddddd");

  API.callWithToken()
    .post("articles/create", data)
    .then((response) => {
      elFormMessage.innerHTML = "";
      elAuthForm.reset();
    })
    .catch((error) => {
      const errors = error.response.data.errors;

      showFormErrorsMessage(errors, elFormMessage);
    });
});
