const categoriesData = () => {
   fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((data) => showCategories(data.data.news_category));
};
const showCategories = (categories) => {
   const categoriesId = document.getElementById("categories");

   categories.forEach((category) => {
      // console.log(category.category_name);
      const button = document.createElement("button");
      button.innerHTML = `
      <a onclick="categoriesIdLoader('${category?.category_id}' , '${category?.category_name}')">${category?.category_name}'</a>
       
      `;

      categoriesId.appendChild(button);
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
   const cardId = document.getElementById("show-card");
   cardId.innerHTML = "";
   show.data.forEach((card) => {
      const { image_url, title, details, author, total_view, _id } = card;
      cardId.innerHTML += `
      <div class="card card-side bg-base-100 shadow-xl my-4">
               <figure><img class="w-80 rounded-lg" src=${image_url} alt="Movie" /></figure>
               <div class="card-body">
                  <h2 class="card-title">${title}</h2>
                  <p>${details.slice(0, 200)}.....</p>
                  <p class="border"></p>
                  <div class="flex justify-between items-center">
                     <div class="flex gap-3">
                     <img class="w-10 h-10 rounded-full" src=${author.img} alt="Movie"  />
                     <div class="">
                     <h6 class="font-semibold">${author ? author.name : "No data"}</h6>
                     <p class="text-slate-400">${author.published_date}</p>
                     </div>
                     </div>
                      
                     <div>
                     <p><i class="fa-solid fa-eye"></i> ${total_view}</p>
                     </div>
                        
                     <div>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star-half-stroke"></i>
                     </div>

                     <div>
                    <span onclick="my_modal_5.showModal()"><i onclick="fetchCardDetails('${_id}')" class="fa-solid fa-arrow-right-long"></i></span>
                     </div>
                  </div>
               </div>
            </div>
      `;
   });
};
const fetchCardDetails = (news_id) => {
   const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => showCardDetails(data.data[0]));
};
const showCardDetails = (detail) => {
   console.log(detail.others_info);

   const modal = document.getElementById("my_modal_5");
   const { image_url, title, details, author, total_view, _id, others_info } = detail;
   modal.innerHTML += `
         <div class="card card-side  shadow-xl m-96 my-4 ">
            <div class="modal-box max-h-full">
                     <figure><img class=" rounded-lg" src=${image_url} alt="Movie" /></figure>
               <div class="card-body">
                        <h2 class="card-title">${title}<div class="badge badge-warning gap-2">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                         ${others_info.is_trending ? 'trending' : ''}
                        </div></h2>
                        <p>${details}</p>
                        <p class="border"></p>
                     <div class="flex justify-between items-center">
                        <div class="flex gap-3">
                           <img class="w-10 h-10 rounded-full" src=${author.img} alt="Movie"  />
                        <div class="">
                           <h6 class="font-semibold">${author ? author.name : "No Data"}</h6>
                           <p class="text-slate-400">${author.published_date}</p>
                           </div>
                           </div>
                      
                     <div>
                        <p><i class="fa-solid fa-eye"></i> ${total_view}</p>
                     </div>
                        
                     <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                     </div>
                   
                  </div>
                  
               </div>
               
               </div>
               <div class="modal-action ">
                  <form method="dialog relative">
                     
                    <button class=" absolute top-[-5px] right-11 "><i class="fa-solid fa-xmark text-red-500 text-3xl rounded-xl "></i></button>
                     
                  </form>
               </div>
            </div>
            
         
   `;
};
