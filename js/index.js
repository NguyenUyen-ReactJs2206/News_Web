const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesNew = document.getElementById("articlesNew");
const elArticleNewLarge = document.getElementById("articleNewLarge");
const elCategoriesFeturedWithArticles = document.getElementById(
  "categoriesFeaturedWithArticles"
);
const elCategoriesFeaturedTab = document.getElementById(
  "categoriesFeaturedTab"
);
const elCategoriesFeaturedTabContent = document.getElementById(
  "categoriesFeaturedTabContent"
);
const elArticlesSlider = document.getElementById("articlesSlider");

//RENDER ARTICLES SLIDER
API.call()
  .get(`articles/popular?limit=5`)
  .then((response) => {
    const articles = response.data.data;

    let html = "";
    articles.forEach((item, index) => {
      html += /*html*/ ` 
  <div class="swiper-slide">
    <a
      href="detail.html?id=${item.id}"
      class="img-bg d-flex align-items-end"
      style="
        background-image: url('${item.thumb}');
      "
    >
      <div class="img-bg-inner">
        <h2>
          ${item.title}
        </h2>
        <p>
        ${item.description}
        </p>
      </div>
    </a>
  </div>`;
    });

    elArticlesSlider.innerHTML = html;
  });

//RENDER ARTICLES TRENDING
API.call()
  .get(`articles/popular?limit=5`)
  .then((response) => {
    const articles = response.data.data;

    let html = "";
    articles.forEach((item, index) => {
      html += renderArticleTrendingItem(item, index);
    });

    elArticlesTrending.innerHTML = html;
  });

//RENDER ALL ARTICLE NEW
API.call()
  .get(`articles?limit=5`)
  .then((response) => {
    const articles = response.data.data;

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

//RENDER CATEGORY FEATURE WITH ARTICLES
API.call()
  .get("categories_news/articles?limit_cate=2&limit=9")
  .then((response) => {
    const data = response.data.data;
    // console.log(data);

    let html = "";
    data.forEach((item, index) => {
      const categoryId = item.id;
      const categoryName = item.name;
      const articles = item.articles;

      html += /*html*/ `
    <section class="category-section">
        <div class="container" data-aos="fade-up">
          ${renderCategorySectionTitle(categoryName, categoryId)}
          ${renderArticlesByCategoryFeatured(articles, index)}
        </div>
    </section>
`;
    });

    elCategoriesFeturedWithArticles.innerHTML = html;
  });

//RENDER CATEGORY FEATURED WITH ARTICLES LAYOUT TAB
API.call()
  .get("categories_news/articles?limit_cate=4&limit=4")
  .then((response) => {
    const data = response.data.data;
    console.log(data);

    let htmlTab = "";
    let htmlTabContent = "";

    data.forEach((item, index) => {
      const categoryName = item.name;
      const articles = item.articles;
      const slug = item.slug;
      const active = index === 0 ? "active" : "";
      const activeShow = index === 0 ? "active show" : "";

      let htmlArticles = "";
      articles.forEach((articleItem, index) => {
        htmlArticles += /*html*/ `
    <div class="col-md-6 col-lg-3">
      <div class="post-entry-1">
        <a href="detail.html?id=${articleItem.id}"
          ><img
            src="${articleItem.thumb}"
            alt="${articleItem.title}"
            class="img-fluid"
        /></a>
        <div class="post-meta">
          <span>${articleItem.publish_date}</span>
        </div>
        <h2>
          <a href="detail.html?id=${articleItem.id}"
            >${articleItem.title}</a
          >
        </h2>
      </div>
    </div>
      `;
      });

      htmlTab += /*html*/ `
            <li class="nav-item" role="presentation">
              <button
                class="nav-link ${active}"
                id="${slug}-tab"
                data-bs-toggle="tab"
                data-bs-target="#${slug}-tab-pane"
                type="button"
                role="tab"
                aria-controls="${slug}-tab-pane"
                aria-selected="false"
              >
                ${categoryName}
              </button>
            </li>
`;

      htmlTabContent += /*html*/ ` 
  <div
    class="tab-pane fade ${activeShow}"
    id="${slug}-tab-pane"
    role="tabpanel"
    aria-labelledby="${slug}-tab"
    tabindex="0"
  >
    <div class="row g-5">${htmlArticles}</div>
  </div>

`;
    });

    elCategoriesFeaturedTab.innerHTML = htmlTab;
    elCategoriesFeaturedTabContent.innerHTML = htmlTabContent;
  });

function renderArticleTrendingItem(item, index) {
  return /*html*/ `
  <li>
   <a href="detail.html?id=${item.id}">
     <span class="number">${index + 1}</span>
     <h3>
     ${item.title}
     </h3>
     <span class="author">${item.author}</span>
   </a>
  </li>`;
}

function renderArticleNewLargeItem(item) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const categoryId = item.category.id;

  return /*html*/ `
  <div class="post-entry-1 lg">
  <a href="detail.html?id=${item.id}"
    ><img
      src="${item.thumb}"
      alt="${item.title}"
      class="img-fluid"
  /></a>
  <div class="post-meta">
    <a href="category.html?id=${categoryId}" class="post-meta">${item.category.name}</a>
    <span class="mx-1">&bullet;</span> 
    <span>${publishDate}</span>
  </div>
  <h2>
    <a href="detail.html?id=${item.id}"
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
  const categoryId = item.category.id;

  return /*html*/ ` 
    <div class="col-lg-6">
      <div class="post-entry-1">
        <a href="detail.html?id=${item.id}"
          ><img
            src="${item.thumb}"
            alt="${item.title}"
            class="img-fluid"
        /></a>
        <div class="post-meta">
           <a href="category.html?id=${categoryId}" class="post-meta">${item.category.name}</a>
          <span class="mx-1">&bullet;</span>
          <span>${item.publish_date}</span>
        </div>
        <h2>
          <a href="detail.html?id=${item.id}"
            >${item.title}</a
          >
        </h2>
      </div>
    </div>`;
}

function renderCategorySectionTitle(categoryName, categoryId) {
  return /*html*/ `
<div class="section-header d-flex justify-content-between align-items-center mb-5">
   <h2>${categoryName}</h2>
   <div>
     <a href="category.html?id=${categoryId}" class="more">See All ${categoryName}</a>
   </div>
</div>
  `;
}

function renderArticlesByCategoryFeatured(articles, idx) {
  let htmlArticlesLeft = "";
  let htmlArticlesRight = "";

  articles.forEach((articleItem, index) => {
    const title = articleItem.title;
    const thumb = articleItem.thumb;
    const publishDate = articleItem.publish_date;
    const author = articleItem.author;

    if (index < 4) {
      htmlArticlesLeft += /*html*/ `
      <div class="col-lg-6">
        <div class="post-entry-1">
          <a href="detail.html?id=${articleItem.id}"
            ><img
              src="${thumb}"
              alt="${title}"
              class="img-fluid"
          /></a>
          <div class="post-meta">
            <span>${publishDate}</span>
          </div>
          <h2>
            <a href="detail.html?id=${articleItem.id}"
              >${title}</a
            >
          </h2>
        </div>
      </div>
    `;
    } else {
      htmlArticlesRight += /*html*/ `
    <div class="post-entry-1 border-bottom">
      <div class="post-meta">
      <span>${publishDate}</span>
      </div>
      <h2 class="mb-2">
        <a href="detail.html?id=${articleItem.id}"
          >${title}</a
        >
      </h2>
      <span class="author mb-3 d-block">${author}</span>
    </div>
      `;
    }
  });

  //Way 1
  let rowClass = "";
  let borderClass = "border-start";
  if (idx % 2 !== 0) {
    rowClass = "flex-row-reverse";
    borderClass = "";
  }
  //Way 2
  // const rowClass = idx % 2 === 0 ? "" : "flex-row-reverse";
  // const borderClass = idx % 2 === 0 ? "border-start" : "";

  return /*html*/ `
  <div class="row g-5 ${rowClass}">
    <div class="col-lg-8">
      <div class="row g-5">
      ${htmlArticlesLeft}
      </div>
    </div>
    <div class="col-lg-4 ${borderClass} custom-border">
      ${htmlArticlesRight}
    </div>
  </div>`;
}
