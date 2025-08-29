document.addEventListener("DOMContentLoaded", function() {

  var nextbtn = document.querySelector('.next');
  var prevbtn = document.querySelector('.prev');
  var carousel = document.querySelector('.carousel');
  var list = document.querySelector('.list');
  var timeRunning = 3000;
  var timeAutoNext = 7000;

  function showSlider(type){
      let items = list.querySelectorAll('.item');
      if(type==='next'){ list.appendChild(items[0]); carousel.classList.add('next'); }
      else{ list.prepend(items[items.length-1]); carousel.classList.add('prev'); }
      setTimeout(()=>{ carousel.classList.remove('next'); carousel.classList.remove('prev'); }, timeRunning);
  }

  if(nextbtn) nextbtn.onclick = ()=>showSlider('next');
  if(prevbtn) prevbtn.onclick = ()=>showSlider('prev');
  setInterval(()=>{ if(nextbtn) nextbtn.click(); }, timeAutoNext);


  function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem("cart"))||[];
      cart.push({movie:name, price:price});
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
  }

  function loadCart(){
      let cart = JSON.parse(localStorage.getItem("cart"))||[];
      let tbody = document.getElementById("cart-body");
      let total = 0;
      if(tbody){
          tbody.innerHTML = "";
          cart.forEach(item=>{
              let row = `<tr><td>${item.movie}</td><td>$${item.price}</td></tr>`;
              tbody.innerHTML += row;
              total += parseFloat(item.price);
          });
          document.getElementById("total").innerText = "$"+total;
      }
  }

  loadCart();

  function clearCart(){
      localStorage.removeItem("cart");
      loadCart();
  }

  const movieSearchBox = document.getElementById('movie-search-box');
  const searchList = document.getElementById('search-list');
  const resultGrid = document.getElementById('result-grid');

  async function loadMovies(searchTerm){
      const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=6998ff`;
      const res = await fetch(URL);
      const data = await res.json();
      if(data.Response==="True") displayMovieList(data.Search);
      else searchList.innerHTML = "<p>No results found</p>";
  }

  function findMovies(){
      let searchTerm = movieSearchBox.value.trim();
      if(searchTerm.length>0){
          searchList.classList.remove('hide-search-list');
          loadMovies(searchTerm);
      } else {
          searchList.classList.add('hide-search-list');
      }
  }

  movieSearchBox.addEventListener('keyup', findMovies);

  function displayMovieList(movies){
      searchList.innerHTML="";
      movies.forEach(movie=>{
          let moviePoster = movie.Poster!=="N/A"?movie.Poster:"assets/image/notfound.png";
          let movieItem = document.createElement('div');
          movieItem.classList.add('search-list-item');
          movieItem.dataset.id = movie.imdbID;
          movieItem.innerHTML=`
              <div class="search-list-item">
                  <div class="search-image-thumbnail">
                      <img src="${moviePoster}" alt="">
                  </div>
                  <div class="search-item-info">
                     <h3>${movie.Title}</h3>
                     <p>${movie.Year}</p>
                  </div>
              </div>
          `;
          searchList.appendChild(movieItem);
      });
      loadMovieDetails();
  }

  function loadMovieDetails(){
      const movies = searchList.querySelectorAll('.search-list-item');
      movies.forEach(movie=>{
          movie.addEventListener('click', async ()=>{
              searchList.classList.add('hide-search-list');
              movieSearchBox.value = "";
              const res = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=6998ff`);
              const details = await res.json();
              displayMovieDetails(details);
          });
      });
  }

  function displayMovieDetails(details){
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${details.Poster !== "N/A" ? details.Poster : "assets/image/notfound.png"}" alt="movie-poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors:</b> ${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b>Awards:</b> ${details.Awards}</p>
        </div>
        
    `;
}
});