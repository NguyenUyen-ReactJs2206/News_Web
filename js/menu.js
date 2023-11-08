const elMainMenu = document.getElementById("mainMenu");

// RENDER MENUS
API.get(`categories_news`).then((response) => {
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
      </li>` +
    /*html*/ `<li class="dropdown">
        <a href="#">
        <span>Tài khoản</span>
        <i class="bi dropdown-indicator bi-chevron-down"></i>
      </a>
      <ul>
        <li><a href="login.html">Đăng nhập</a></li>
        <li><a href="register.html">Đăng ký</a></li>
      </ul>
    </li>`;

  const token = localStorage.getItem("ACCESS_TOKEN");
  API.get("auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((responseMe) => {
    console.log(responseMe);
  });
});
