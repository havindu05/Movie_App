var nextbtn = document.querySelector('.next');
    prevbtn = document.querySelector('.prev');
    carousel = document.querySelector('.carousel');
    list    = document.querySelector('.list');
    item    = document.querySelectorAll('.item');
    runningTime = document.querySelector('.timeRunning');

let timeRunning = 3000
let timeAutoNext = 7000

nextbtn.onclick = function(){
    showSlider('next')
}

prevbtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut
let runNextAuto = setTimeOut(()=>{
    nextBtn.click()
},timeAutoNext)



function showSlider(type){
    let sliderItemsDom = list.querySelectorAll('.list .item');
    
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0]); 
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }
    
    clearTimeout(runTimeOut)

    setTimeout = setTimeout( ()=>{
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    },timeAutoNext)

    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(()=>{
        nextbtn.click()
    },timeAutoNext)
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ movie: name, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  
  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let tbody = document.getElementById("cart-body");
    let total = 0;
  
    if (tbody) { 
      tbody.innerHTML = ""; 
  
      cart.forEach(item => {
        let row = `<tr>
                     <td class="border px-4 py-2 text-white">${item.movie}</td>
                     <td class="border px-4 py-2 text-white">$${item.price}</td>
                   </tr>`;
        tbody.innerHTML += row;
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

  