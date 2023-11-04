const elArticles = document.getElementById("articles");
const elCategoryTitle = document.getElementById("categoryTitle");
// const elBtnLoadMore = document.getElementById("btnLoadMore");
const elMyPagination = document.getElementById("myPagination");

// Get ID on URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
// Handle Error => Home (way1)
// if (isNaN(id)) window.location.href = "index.html";

let currentPage = parseInt(urlParams.get("page"));
// Not a number then currentPage=1
if (isNaN(currentPage)) currentPage = 1;

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

// Event Delegate
elMyPagination.addEventListener("click", function (e) {
  const el = e.target;
  // Kiểm tra 1 element có tồn tại một class có tên là page-item
  if (el.classList.contains("page-item")) {
    currentPage = parseInt(el.innerText);
    getArticles(currentPage);
    addOrUpdateUrlParameter("page", currentPage);
  }

  if (el.classList.contains("page-item-prev")) {
    currentPage--;
    getArticles(currentPage);
    addOrUpdateUrlParameter("page", currentPage);
  }

  if (el.classList.contains("page-item-next")) {
    currentPage++;
    getArticles(currentPage);
    addOrUpdateUrlParameter("page", currentPage);
  }
});

function addOrUpdateUrlParameter(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(key, value);
  const newUrl = window.location.pathname + "?" + urlParams.toString();
  history.pushState(null, "", newUrl);
}

function getArticles(page = 1) {
  API.get(`categories_news/${id}/articles?limit=5&page=${page}`)
    .then((response) => {
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
                          <a href="detail.html?id=${item.id}" class="me-4 thumbnail">
                              <img src="${thumb}" alt="${title}" class="img-fluid"/>
                          </a>
                          <div>
                              <div class="post-meta">
                                  <span>${publishDate}</span>
                              </div>
                              <h3>
                                  <a href="detail.html?id=${item.id}" >${title}</a>
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
      elArticles.innerHTML = html;
      renderPagination(totalPages);

      //   elArticles.innerHTML += html;
      //   elBtnLoadMore.innerText = "Xem thêm";
      //   elBtnLoadMore.disabled = false;
    })
    .catch((error) => {
      window.location.href = "index.html";
    });
}

function renderPagination(total) {
  const disablePrev = currentPage === 1 ? "pointer-events-none" : "";

  let html = `<a href="#" class="prev page-item-prev ${disablePrev}">Prevous</a>`;
  for (let index = 1; index < total; index++) {
    const active = index === currentPage ? "active pointer-events-none" : "";

    html += `
    <a href="#" class="page-item ${active}">${index}</a>
`;
  }

  const disableNext = currentPage === total ? "pointer-events-none" : "";
  html += `<a href="#" class="next page-item-next ${disableNext}">Next</a>`;
  elMyPagination.innerHTML = html;
}
