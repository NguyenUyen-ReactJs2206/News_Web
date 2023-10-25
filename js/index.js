const BASE_URL = "https://apiforlearning.zendvn.com/api/v2/";

const elMainMenu = document.getElementById("mainMenu");
console.log(elMainMenu);

// Make a request for a user with a given ID
axios.get(`${BASE_URL}categories_news`).then((response) => {
  // handle success
  const data = response.data;
  const categories = data.data;
  console.log(categories);

  let htmlMenu = "";
  let htmlMenuOther = "";
  //vong lap forEach
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += /*html*/ `<li><a href="#">${item.name}</a></li>`;
    } else {
      htmlMenuOther += /*html*/ `<li><a href="#">${item.name}</a></li>`;
    }
  });

  //hien thi len id=mainMenu
  elMainMenu.innerHTML =
    htmlMenu +
    /*html*/ `<li class="dropdown">
       <a href="category.html">
         <span>Danh mục khác</span>
         <i class="bi bi-chevron-down dropdown-indicator"></i>
      </a>
      <ul>${htmlMenuOther}</ul>
    </li>`;
});
