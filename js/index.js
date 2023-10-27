const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

const elMainMenu = document.getElementById("mainMenu");
const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesNew = document.getElementById("articlesNew");
const elArticleNewLarge = document.getElementById("articleNewLarge");
const elCategoriesFeturedWithArticles = document.getElementById(
  "categoriesFeaturedWithArticles"
);

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
API.get("categories_news/articles?limit_cate=2&limit=9").then((response) => {
  const data = response.data.data;
  console.log(data);

  let html = "";
  data.forEach((item, index) => {
    html += /*html*/ `<section class="category-section">
<div class="container" data-aos="fade-up">
  <div
    class="section-header d-flex justify-content-between align-items-center mb-5"
  >
    <h2>${item.name}</h2>
    <div>
      <a href="category.html" class="more">See All Lifestyle</a>
    </div>
  </div>

  <div class="row g-5">
    <div class="col-lg-8">
      <div class="row g-5">
        <div class="col-lg-6">
          <div class="post-entry-1">
            <a href="single-post.html"
              ><img
                src="assets/img/post-landscape-6.jpg"
                alt=""
                class="img-fluid"
            /></a>
            <div class="post-meta">
              <span class="date">Lifestyle</span>
              <span class="mx-1">&bullet;</span>
              <span>Jul 5th '22</span>
            </div>
            <h2>
              <a href="single-post.html"
                >Let’s Get Back to Work, New York</a
              >
            </h2>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="post-entry-1">
            <a href="single-post.html"
              ><img
                src="assets/img/post-landscape-5.jpg"
                alt=""
                class="img-fluid"
            /></a>
            <div class="post-meta">
              <span class="date">Lifestyle</span>
              <span class="mx-1">&bullet;</span>
              <span>Jul 17th '22</span>
            </div>
            <h2>
              <a href="single-post.html"
                >How to Avoid Distraction and Stay Focused During
                Video Calls?</a
              >
            </h2>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="post-entry-1">
            <a href="single-post.html"
              ><img
                src="assets/img/post-landscape-3.jpg"
                alt=""
                class="img-fluid"
            /></a>
            <div class="post-meta">
              <span class="date">Lifestyle</span>
              <span class="mx-1">&bullet;</span>
              <span>Jul 5th '22</span>
            </div>
            <h2>
              <a href="single-post.html"
                >6 Easy Steps To Create Your Own Cute Merch For
                Instagram</a
              >
            </h2>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="post-entry-1">
            <a href="single-post.html"
              ><img
                src="assets/img/post-landscape-2.jpg"
                alt=""
                class="img-fluid"
            /></a>
            <div class="post-meta">
              <span class="date">Lifestyle</span>
              <span class="mx-1">&bullet;</span>
              <span>Mar 1st '22</span>
            </div>
            <h2>
              <a href="single-post.html"
                >10 Life-Changing Hacks Every Working Mom Should
                Know</a
              >
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 border-start custom-border">
      <div class="post-entry-1 border-bottom">
        <div class="post-meta">
          <span class="date">Lifestyle</span>
          <span class="mx-1">&bullet;</span> <span>Jul 5th '22</span>
        </div>
        <h2 class="mb-2">
          <a href="single-post.html"
            >How to Avoid Distraction and Stay Focused During Video
            Calls?</a
          >
        </h2>
        <span class="author mb-3 d-block">Jenny Wilson</span>
      </div>

      <div class="post-entry-1 border-bottom">
        <div class="post-meta">
          <span class="date">Lifestyle</span>
          <span class="mx-1">&bullet;</span> <span>Jul 5th '22</span>
        </div>
        <h2 class="mb-2">
          <a href="single-post.html"
            >17 Pictures of Medium Length Hair in Layers That Will
            Inspire Your New Haircut</a
          >
        </h2>
        <span class="author mb-3 d-block">Jenny Wilson</span>
      </div>

      <div class="post-entry-1 border-bottom">
        <div class="post-meta">
          <span class="date">Lifestyle</span>
          <span class="mx-1">&bullet;</span> <span>Jul 5th '22</span>
        </div>
        <h2 class="mb-2">
          <a href="single-post.html"
            >9 Half-up/half-down Hairstyles for Long and Medium
            Hair</a
          >
        </h2>
        <span class="author mb-3 d-block">Jenny Wilson</span>
      </div>

      <div class="post-entry-1 border-bottom">
        <div class="post-meta">
          <span class="date">Lifestyle</span>
          <span class="mx-1">&bullet;</span> <span>Jul 5th '22</span>
        </div>
        <h2 class="mb-2">
          <a href="single-post.html"
            >Life Insurance And Pregnancy: A Working Mom’s Guide</a
          >
        </h2>
        <span class="author mb-3 d-block">Jenny Wilson</span>
      </div>
      <div class="post-entry-1 border-bottom">
        <div class="post-meta">
          <span class="date">Lifestyle</span>
          <span class="mx-1">&bullet;</span> <span>Jul 5th '22</span>
        </div>
        <h2 class="mb-2">
          <a href="single-post.html"
            >Life Insurance And Pregnancy: A Working Mom’s Guide</a
          >
        </h2>
        <span class="author mb-3 d-block">Jenny Wilson</span>
      </div>
    </div>
  </div>
  <!-- End .row -->
</div>
</section>
`;
  });
  elCategoriesFeturedWithArticles.innerHTML = html;
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
