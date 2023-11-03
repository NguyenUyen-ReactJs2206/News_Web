const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.locale("vi");
dayjs.extend(window.dayjs_plugin_relativeTime);

const elMainMenu = document.getElementById("mainMenu");
const elArticles = document.getElementById("articles");
const elCategoryTitle = document.getElementById("categoryTitle");
// const elBtnLoadMore = document.getElementById("btnLoadMore");
const elMyPagination = document.getElementById("myPagination");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
let currentPage = 1;

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

// RENDER ARTICLES FOR CATEGORY
// Load Article of Page=1 when entering the page
getArticles();

// LOAD MORE
// elBtnLoadMore.addEventListener("click", function () {
//   currentPage++;
//   elBtnLoadMore.innerText = "Đang tải thêm...";
//   elBtnLoadMore.disabled = true;
//   getArticles(currentPage);
// });

function getArticles(page = 1) {
  API.get(`categories_news/${id}/articles?limit=5&page=${page}`).then(
    (response) => {
      const articles = response.data.data;
      let categoryName = "";
      console.log(response.data);
      const totalPages = response.data.meta.last_page;

      let html = "";
      articles.forEach((item) => {
        const title = item.title;
        const thumb = item.thumb;
        const publishDate = dayjs(item.publish_date).fromNow();
        const description = item.description;
        const authorName = item.author;
        categoryName = item.category.name;

        html += /*html*/ `
                      <div class="d-md-flex post-entry-2 half">
                          <a href="single-post.html" class="me-4 thumbnail">
                              <img src="${thumb}" alt="${title}" class="img-fluid"/>
                          </a>
                          <div>
                              <div class="post-meta">
                                  <span>${publishDate}</span>
                              </div>
                              <h3>
                                  <a href="single-post.html" >${title}</a>
                              </h3>
                              <p>${description}</p>
                              <div class="d-flex align-items-center author">
                                  <div class="photo">
                                      <img src="assets/img/person-2.jpg" alt=""class="img-fluid" />
                                  </div>
                                  <div class="name">
                                      <h3 class="m-0 p-0">${authorName}</h3>
                                  </div>
                              </div>
                          </div>
                      </div>`;
      });
      elCategoryTitle.innerText = `Category: ${categoryName}`;
      elArticles.innerHTML += html;
      renderPagination(totalPages);
      //   elBtnLoadMore.innerText = "Xem thêm";
      //   elBtnLoadMore.disabled = false;
    }
  );
}

function renderPagination(total) {
  let html = "";
  for (let index = 1; index < total; index++) {
    html += `
    <a href="#" class="prev">Prevous</a>
    <a href="#">${index}</a>
    <a href="#" class="next">Next</a>`;
  }

  elMyPagination.innerHTML = html;
}
