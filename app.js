const loadCategories = () =>{
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}