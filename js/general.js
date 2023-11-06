const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.locale("vi");
dayjs.extend(window.dayjs_plugin_relativeTime);

let RECENT_POST = JSON.parse(localStorage.getItem("RECENT_POST")) || [];

let recentPostsIdString = RECENT_POST.toString();

const elRecentPosts = document.getElementById("recentPosts");

//SEARCH
const elInputSearch = document.getElementById("inputSearch");

elInputSearch.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.key === "Enter") {
    //search
    const keyword = elInputSearch.value.trim();
    if (keyword) {
      //todo
      window.location.href = `search.html?keyword=${keyword}`;
    } else {
      alert("Vui lòng nhập từ khóa cần tìm");
      elInputSearch.value = "";
    }
  }
});

API.get(`articles?limit=4&ids=${recentPostsIdStsring}`).then((response) => {
  const articles = response.data.data;
  console.log(articles);

  let html = "";
  articles.forEach((item) => {
    const categoryId = item.category.id;

    html += /*html*/ `  
  <li>
    <a href="detail.html?id=${item.id}" class="d-flex align-items-center">
      <img
        src="${item.thumb}"
        alt="${item.title}"
        class="img-fluid me-3"
      />
      <div>
        <div class="post-meta">
          <span class="date"> 
              ${item.category.name}
          </span>
          <span class="mx-1">&bullet;</span>
          <span>${dayjs(item.publish_date).fromNow()}</span>
        </div>
        <span>${item.title}</span>
      </div>
    </a>
  </li>`;
  });

  elRecentPosts.innerHTML = html;
});
