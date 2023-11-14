//Access Key    j7A0MN2L2as_93aEMLHaQM7EUWPgAaAf4xjRN-UWb9g
//Secret key    WIT6KtYL_UM_7eiBQaCNE3dy-G56VdauyAU96qCDVPE

//https://api.unsplash.com/photos/random?client_id=j7A0MN2L2as_93aEMLHaQM7EUWPgAaAf4xjRN-UWb9g&orientation=landscape
API.callWithToken()
  .get("auth/me")
  .then((response) => {})
  .catch((error) => {
    window.location.href = "index.html";
  });

const elAuthForm = document.getElementById("authForm");
const elFormMessage = document.getElementById("formMessage");
const elThumb = document.getElementById("thumb");
const elThumbPreview = document.getElementById("thumPreview");
const elBtnRandomThumb = document.getElementById("btnRandomThumb");

elBtnRandomThumb.addEventListener("click", function () {
  API.call()
    .get(
      "https://api.unsplash.com/photos/random?client_id=j7A0MN2L2as_93aEMLHaQM7EUWPgAaAf4xjRN-UWb9g&orientation=landscape"
    )
    .then((response) => {
      console.log(response);
      const urlThumb = response.data.urls.regular;
      elThumb.value = urlThumb;
      elThumbPreview.src = urlThumb;
    });
});

elThumb.addEventListener("change", function () {
  if (elThumb.value) elThumbPreview.src = elThumb.value;
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
      elThumbPreview.src = "./image/Placeholder_view_vector.png";
    })
    .catch((error) => {
      const errors = error.response.data.errors;

      showFormErrorsMessage(errors, elFormMessage);
    });
});
