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

