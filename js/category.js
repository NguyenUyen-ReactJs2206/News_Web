const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.locale("vi");
dayjs.extend(window.dayjs_plugin_relativeTime);

const elMainMenu = document.getElementById("mainMenu");
const elArticles = document.getElementById("articles");

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
         <a href="category.html">
           <span>Danh mục khác</span>
           <i class="bi bi-chevron-down dropdown-indicator"></i>
        </a>
        <ul>${htmlMenuOther}</ul>
      </li>`;
});

//RENDER ARTICLES FOR CATEGORY
API.get("categories_news/1/articles?limit=5&page=1").then((response) => {
  const articles = response.data.data;
  console.log(articles, "ssss");

  let html = "";
  articles.forEach((item) => {
    const title = item.title;
    const thumb = item.thumb;
    const publishDate = dayjs(item.publish_date).fromNow();
    const description = item.description;
    const authorName = item.author;

    html += /*html*/ `
                <div class="d-md-flex post-entry-2 half">
                  <a href="single-post.html" class="me-4 thumbnail">
                    <img
                      src="${thumb}"
                      alt="${title}"
                      class="img-fluid"
                    />
                  </a>
                  <div>
                    <div class="post-meta">
                      <span>${publishDate}</span>
                    </div>
                    <h3>
                      <a href="single-post.html"
                        >${title}</a
                      >
                    </h3>
                    <p>
                      ${description}
                    </p>
                    <div class="d-flex align-items-center author">
                      <div class="photo">
                        <img
                          src="assets/img/person-2.jpg"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                      <div class="name">
                        <h3 class="m-0 p-0">${authorName}</h3>
                      </div>
                    </div>
                  </div>
                </div>`;
  });
  elArticles.innerHTML = html;
});
