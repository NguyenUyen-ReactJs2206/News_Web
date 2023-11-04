const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));

const elCategoryName = document.getElementById("categoryName");
const elArticleThumb = document.getElementById("articleThumb");
const elPublishDate = document.getElementById("publishDate");
const elArticleTitle = document.getElementById("articleTitle");
const elArticleContent = document.getElementById("articleContent");

API.get(`articles/${id}`).then((response) => {
  console.log(response.data);
  const article = response.data.data;

  elCategoryName.innerText = article.category.name;
  elPublishDate.innerText = article.publish_date;
  elArticleTitle.innerText = article.title;
  elArticleContent.innerHTML = article.content;
  elArticleThumb.src = article.thumb;
});
