const elMainMenu = document.getElementById("mainMenu");

// RENDER MENUS
API.call()
  .get(`categories_news`)
  .then((response) => {
    const data = response.data;
    const categories = data.data;

    let htmlMenu = "";
    let htmlMenuOther = "";

    categories.forEach((item, index) => {
      if (index < 3) {
        htmlMenu += /*html*/ `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`;
      } else {
        htmlMenuOther += /*html*/ `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`;
      }
    });

    //hien thi len id=mainMenu
    elMainMenu.innerHTML =
      htmlMenu +
      /*html*/ `<li class="dropdown">
        <a href="#">
          <span>Danh mục khác</span>
          <i class="bi dropdown-indicator bi-chevron-down"></i>
        </a>
        <ul>${htmlMenuOther}</ul>
      </li>`;

    API.callWithToken()
      .get("auth/me")
      .then((responseMe) => {
        const name = responseMe.data.data.name;

        elMainMenu.innerHTML += /*html*/ `
    <li class="dropdown">
        <a href="#">
        <span>${name}</span>
        <i class="bi dropdown-indicator bi-chevron-down"></i>
      </a>
      <ul>
        <li><a href="profile.html">Thông tin tài khoản</a></li>
        <li><a href="change-password.html">Thay đổi mật khẩu</a></li>
        <li><a href="#" id="btnLogout">Đăng xuất</a></li>
      </ul>
    </li>`;
      })
      .catch((error) => {
        elMainMenu.innerHTML += /*html*/ `<li class="dropdown">
        <a href="#">
        <span>Tài khoản</span>
        <i class="bi dropdown-indicator bi-chevron-down"></i>
      </a>
      <ul>
        <li><a href="login.html">Đăng nhập</a></li>
        <li><a href="register.html">Đăng ký</a></li>
      </ul>
    </li>`;
      });
  });

//LOGOUT
elMainMenu.addEventListener("click", function (e) {
  const el = e.target;
  console.log(e.target, "eeeeee");

  if (el.id === "btnLogout") {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "index.html";
  }
});
