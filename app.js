
const loadCategories = () =>{
    toggleSpinner(true);
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCategory(data.data.news_category))
        .catch(error => alert(error.message));
}
const displayCategory = category =>{
    
    const categoryList = document.getElementById("category-list");
        
    // console.log(category.length);
    for(const categories of category){
        // console.log(categories);
        
        const li= document.createElement('li');
        li.innerHTML = `
            <a onclick="showCategory('${categories.category_id}','${categories.category_name}')" class="nav-link text-black category-link" href="#">${categories.category_name}</a>
        `;
        
        categoryList.appendChild(li);
        
    }
    toggleSpinner(false);
    
}

const showCategory= (id, name )=>{
    toggleSpinner(true);
    
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => ShowNews(data.data, name))
      .catch((error) => alert(error.message));
}

const ShowNews = (newses, name) =>{
    
    console.log(newses);

    const countItem = document.getElementById("count-item");
    countItem.innerText = `
        ${newses.length} item found for this category ${name}
    
    `;

    const noData = document.getElementById('no-data');
    if(newses.length === 0){
        noData.classList.remove('d-none')
    }
    else{
        noData.classList.add("d-none");
        newses.sort((a, b) => b.total_view - a.total_view);
    }
    const newsList = document.getElementById('show-news');
    newsList.textContent ='';
    
    newses.forEach(news => {
        console.log(news);
        const div = document.createElement('div');
        // div.classList.add("card");
        div.innerHTML = `
            <div class="card mb-5">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${news.thumbnail_url}" class=" res-img h-100 img-fluid rounded-start " alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"> ${news.title} </h5> <br />
                                <p class="card-text">${(news.details = news.details.slice(0, 250))}...</p>
                                
                            </div>
                            <div class="card-body mt-5">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <img src="${news.author.img}" alt="" width="40" height="40"
                                                    class="d-inline-block rounded-circle m-2">
                                            </div>
                                            <div>
                                                <p class="m-0">${news.author.name ? news.author.name : 'Data N/A'}</p>
                                                <p class="m-0">${news.author.published_date ? news.author.published_date : 'Data N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 align-items-center d-flex">
                                        
                                            <i class="fa-regular fa-eye"></i>
                                            <div class="mt-3 p-2">
                                            <p>${news.total_view}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 align-items-center d-flex"> 
                                        ${news.rating.number}
                                        <i class="fa-regular fa-star-half-stroke"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>

                                    </div>
                                    <div class="col-md-3 align-items-center d-flex"> 
                                        <button onclick="showDetails('${news._id}')" class="btn" data-bs-toggle="modal" data-bs-target="#newsModal">
                                            <a href="#"><i class="fa-solid fa-arrow-right fa-2xl"></i></a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
        `;
        newsList.appendChild(div);
        
    });
    toggleSpinner(false);

}

const showDetails = newsId =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showNewsDetails(data.data[0]))
      .catch((error) => alert(error.message));
}

const showNewsDetails = singleNewsId =>{
    console.log(singleNewsId);
    const modalTitle = document.getElementById("newsModalLabel");
    console.log(singleNewsId.title);
    modalTitle.innerText = singleNewsId.title;

    const newsDetails = document.getElementById("news-details");
    newsDetails.innerHTML = `

        <img src="${singleNewsId.image_url}" class="img-fluid" alt="...">
        <br/>
        <p class="my-5">${singleNewsId.details}</p>
    `;
    
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    const loaderNews = document.getElementById("show-news");
    if(isLoading){
        loaderSection.classList.remove('d-none');
        loaderNews.classList.add('d-none');
    }
    else{
        loaderNews.classList.remove('d-none');
        loaderSection.classList.add('d-none');
    }
}

loadCategories();

showCategory("05",'Entertainment');