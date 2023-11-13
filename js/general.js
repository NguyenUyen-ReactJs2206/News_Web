// const API = axios.create({
//   baseURL: "https://apiforlearning.zendvn.com/api/v2/",
// });

const API = {
  call: function () {
    return axios.create({
      baseURL: "https://apiforlearning.zendvn.com/api/v2/",
    });
  },
  callWithToken: function (token) {
    if (!token) {
      token = localStorage.getItem(ACCESS_TOKEN);
    }
    return axios.create({
      baseURL: "https://apiforlearning.zendvn.com/api/v2/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

dayjs.locale("vi");
dayjs.extend(window.dayjs_plugin_relativeTime);

const ACCESS_TOKEN = "ACCESS_TOKEN";
const token = localStorage.getItem(ACCESS_TOKEN);

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

API.call()
  .get(`articles?limit=4&ids=${recentPostsIdString}`)
  .then((response) => {
    const articles = response.data.data;
    console.log(articles);

    let html = "";
    articles.forEach((item) => {
      // const categoryId = item.category.id;

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

function showFormErrorsMessage(errors, el) {
  let errString = "";

  //loop object - Duyet qua object
  for (const property in errors) {
    errString += /*html*/ `<li>${errors[property]}</li>`;
  }

  el.innerHTML = /*html*/ `
      <div class="alert alert-danger" role="alert">
        <ul>
          ${errString}
        </ul>
      </div>`;
}
