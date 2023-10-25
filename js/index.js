const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

const elMainMenu = document.getElementById("mainMenu");
const elArticlesTrending = document.getElementById("articlesTrending");

// RENDER MENUS
API.get(`categories_news`).then((response) => {
  const data = response.data;
  const categories = data.data;
  //   console.log(categories);

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

//RENDER ARTICLES TRENDING
API.get(`articles/popular?limit=5`).then((response) => {
  const articles = response.data.data;
  console.log(articles);

  let html = "";
  articles.forEach((item, index) => {
    html += /*html*/ `
    <li>
     <a href="single-post.html">
       <span class="number">${index + 1}</span>
       <h3>
       ${item.title}
       </h3>
       <span class="author">${item.author}</span>
     </a>
  </li>`;
  });

  elArticlesTrending.innerHTML = html;
});
