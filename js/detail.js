const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));

const elCategoryName = document.getElementById("categoryName");
const elArticleThumb = document.getElementById("articleThumb");
const elPublishDate = document.getElementById("publishDate");
const elArticleTitle = document.getElementById("articleTitle");
const elArticleContent = document.getElementById("articleContent");

let RECENT_POST = JSON.parse(localStorage.getItem("RECENT_POST")) || [];

console.log(RECENT_POST);
API.get(`articles/${id}`)
  .then((response) => {
    console.log(response.data);
    const article = response.data.data;

    elCategoryName.innerText = article.category.name;
    elPublishDate.innerText = article.publish_date;
    elArticleTitle.innerText = article.title;
    elArticleContent.innerHTML = article.content;
    elArticleThumb.src = article.thumb;

    //Save the 4 most recently viewed articles to LocalStorage
    if (!RECENT_POST.includes(id)) {
      if (RECENT_POST.length === 4) {
        //Delete bai dau
        RECENT_POST.shift();
      }
      RECENT_POST.push(id);
      //Save Id in LocalStorage
      localStorage.setItem("RECENT_POST", JSON.stringify(RECENT_POST));
    }
  })
  .catch((error) => {
    window.location.href = "index.html";
  });
