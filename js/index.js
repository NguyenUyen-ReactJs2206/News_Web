const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

const elMainMenu = document.getElementById("mainMenu");
const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesNew = document.getElementById("articlesNew");
const elArticleNewLarge = document.getElementById("articleNewLarge");

// RENDER MENUS
API.get(`categories_news`).then((response) => {
  const data = response.data;
  const categories = data.data;

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

  let html = "";
  articles.forEach((item, index) => {
    html += renderArticleTrendingItem(item, index);
  });

  elArticlesTrending.innerHTML = html;
});

//RENDER ALL ARTICLE NEW
API.get(`articles?limit=5`).then((response) => {
  const articles = response.data.data;
  console.log(articles);

  let html = "";
  articles.forEach((item, index) => {
    if (index === 0) {
      elArticleNewLarge.innerHTML = renderArticleNewLargeItem(item);
    } else {
      html += renderArticleNewItem(item);
    }
  });

  elArticlesNew.innerHTML = html;
});

function renderArticleTrendingItem(item, index) {
  return /*html*/ `
  <li>
   <a href="single-post.html">
     <span class="number">${index + 1}</span>
     <h3>
     ${item.title}
     </h3>
     <span class="author">${item.author}</span>
   </a>
  </li>`;
}

function renderArticleNewLargeItem(item) {
  return /*html*/ `
  <div class="post-entry-1 lg">
  <a href="#"
    ><img
      src="${item.thumb}"
      alt="${item.title}"
      class="img-fluid"
  /></a>
  <div class="post-meta">
    <span class="date">${item.category.name}</span>
    <span class="mx-1">&bullet;</span> 
    <span>${item.publish_date}</span>
  </div>
  <h2>
    <a href="#"
      >${item.title}</a
    >
  </h2>
  <p class="mb-4 d-block">
    ${item.description}
  </p>
  
  <div class="d-flex align-items-center author">
    <div class="photo">
      <img
        src="assets/img/person-1.jpg"
        alt=""
        class="img-fluid"
      />
    </div>
    <div class="name">
      <h3 class="m-0 p-0">${item.author}</h3>
    </div>
  </div>
  </div>
  `;
}

function renderArticleNewItem(item) {
  return /*html*/ ` 
    <div class="col-lg-6">
      <div class="post-entry-1">
        <a href="#"
          ><img
            src="${item.thumb}"
            alt="${item.title}"
            class="img-fluid"
        /></a>
        <div class="post-meta">
          <span class="date">${item.category.name}</span>
          <span class="mx-1">&bullet;</span>
          <span>${item.publish_date}</span>
        </div>
        <h2>
          <a href="#"
            >${item.title}</a
          >
        </h2>
      </div>
    </div>`;
}
