const categoriesData = () => {
   fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((data) => showCategories(data.data.news_category));
};
const showCategories = (categories) => {
   const categoriesId = document.getElementById("categories");

   categories.forEach((category) => {
      // console.log(category.category_name);
      const li = document.createElement("li");
      li.innerHTML = `
      <a onclick="categoriesIdLoader('${category?.category_id}' , '${category?.category_name}')">${category?.category_name}'</a>
       
      `;

      categoriesId.appendChild(li);
   });
};

const categoriesIdLoader = (category_id, category_name) => {
   const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => dataLengthShow(data, category_name));
};

const dataLengthShow = (show, category_name) => {
   console.log(show.data);
   const showLength = (document.getElementById("all-data-show").innerText = show.data.length);

   const showName = (document.getElementById("all-data-name").innerText = category_name);

   
};
