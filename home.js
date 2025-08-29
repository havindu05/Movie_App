document.addEventListener("DOMContentLoaded", function()) {

  var nextbtn = document.querySelector('.next');
  var prevbtn = document.querySelector('.prev');
  var carousel = document.querySelector('.carousel');
  var list = document.querySelector('.list');
  var item = document.querySelectorAll('.item');
  var runningTime = document.querySelector('.timeRunning');

  let timeRunning = 3000;
  let timeAutoNext = 7000;

  if(nextbtn) {
      nextbtn.onclick = function(){
          showSlider('next');
      }
  }

  if(prevbtn) {
      prevbtn.onclick = function(){
          showSlider('prev');
      }
  }

  let runTimeOut;
  let runNextAuto = setTimeout(()=>{
      nextbtn.click();
  }, timeAutoNext);

  function showSlider(type){
      let sliderItemsDom = list.querySelectorAll('.item');
      
      if(type === 'next'){
          list.appendChild(sliderItemsDom[0]); 
          carousel.classList.add('next');
      } else {
          list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
          carousel.classList.add('prev');
      }
      
      clearTimeout(runTimeOut);

      runTimeOut = setTimeout(()=>{
          carousel.classList.remove('next');
          carousel.classList.remove('prev');
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(()=>{
          nextbtn.click();
      }, timeAutoNext);
  }

  
  function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ movie: name, price: price });
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let tbody = document.getElementById("cart-body");
      if(tbody){
          tbody.innerHTML = "";
          let total = 0;
          cart.forEach(item => {
              let row = `<tr>
                          <td class="border px-4 py-2 text-white">${item.movie}</td>
                          <td class="border px-4 py-2 text-white">$${item.price}</td>
                      </tr>`;
              tbody.innerHTML += row;
              total += parseFloat(item.price);
          });
          document.getElementById("total").innerText = "$" + total;
      }
  }

  function clearCart() {
      localStorage.removeItem("cart");
      if (document.getElementById("cart-body")) {
          document.getElementById("cart-body").innerHTML = "";
          document.getElementById("total").innerText = "$0";
      }
  }

  const movieSearchBox = document.getElementById('movie-search-box');
  const searchList = document.getElementById('search-list');
  const resultGrid = document.getElementById('result-grid');

  async function loadMovies(searchTerm){
      const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=6998ff`;
      const res = await fetch(URL);
      const data = await res.json();
      //console.log(data.search); 
      if(data.Response == "True") displayMovieList(data.Search);
  }

  function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
      searchList.classList.remove('hide-search-list');
      loadMovies(searchTerm);
  }else{
    searchList.classList.add('hide-search-list');
  }

  function displayMovieList(movies){
    searchList.innerHTML= "";
    for(let idx = 0; idx<movies.length;idx++){
      let movieListItem = document.createElement('div');
      movieListItem.dataset.id = movies[idx].imdbID;
      movieListItem.classList.add( 'search-list-item');
      if(movies[idx].Poster !== "N/A")
        moviePoster = movies[idx].Poster;
        else 
        moviePoster = "image_not_found-png";

        movieListItem.innerHTML = `
            <div class="search-list-item">
                        <div class="search-image-thumbnail">
                            <img src="${moviePoster} alt="">
                        </div>
                        <div class="search-item-info">
                           <h3>${movies[idx].Titlel}</h3>
                            <p>${movies[idx].Year}</p>
                        </div>
                    </div>
        `;

        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
  }

  function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie=> {
        movie.addEventListener('click',async ()=>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://ww.omdbapi.com/?i=${movie.dataset.id}&apikev=6998ff`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
  }

function displayMovieDetails(details){
  resultGrid.innerHTML=`
  <div class="movie-poster">
                        <img src="${details.Poster !== "N/A" ? details.Poster : "assest/image/notfound.png"}" alt="movie-poster">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${details.Titlel}</h3>
                        <ul class="movie-misc-info">
                            <li class="year">Year:${details.Year}</li>
                            <li class="rated">Ratings:${details.Rated}</li>
                            <li class="released">Released :${details.Released}</li>
                        </ul>
                        <p class="genre"><b>Genre :</b>${details.Genre}</p>
                        <p class="writer"><b>Writer :</b>${details.Writer}</p>
                        <p class="actors"><b>Actors :</b>${details.Actors}</p>
                        <p class="polt"><b>Polt :</b>${details.Polt}</p>
                        <p class="language"><b>Language :</b>${details.Language} </p>
                        <p class="awards"><b>Awards :</b>${details.Awards}</p>
                    </div>
  `
}


};
