const elArticles = document.getElementById("articles");
const elCategoryTitle = document.getElementById("categoryTitle");
const elMyPagination = document.getElementById("myPagination");

// Get ID on URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get("keyword");

let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;

getArticles();

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
  API.get(`articles/search?q=${keyword}&limit=5&page=${page}`)
    .then((response) => {
      const articles = response.data.data;
      console.log(response.data);
      const totalPages = response.data.meta.last_page;
      const total = response.data.meta.total;

      let html = "";
      articles.forEach((item) => {
        //Highlight keyword
        const regex = new RegExp(keyword, "gi");

        //replace(regex, `<mark>${keyword}</mark>`) : thay the thanh highlight key
        //match is keyword
        const title = item.title.replace(
          regex,
          (match) => `<mark>${match}</mark>`
        );
        const thumb = item.thumb;
        const publishDate = dayjs(item.publish_date).fromNow();
        const description = item.description.replace(
          regex,
          (match) => `<mark>${match}</mark>`
        );
        const authorName = item.author;

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
      elCategoryTitle.innerText = `Tìm thấy ${total} bài viết với từ khóa "${keyword}"`;
      elArticles.innerHTML = html;
      renderPagination(totalPages);
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
