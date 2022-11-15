const start = document.querySelector(".start");
const startButton = document.querySelector(".startButton");
const game = document.querySelector(".game");
const holes = [...document.querySelectorAll(".hole")];
const number = document.querySelector(".number");
const final = document.querySelector(".final");
const againButton = document.querySelector(".againButton");
const homeButton = document.querySelector(".homeButton");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")

let score;
let timer
let img;
let endScore;

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        game.classList.remove("hide")
        score = 0;
        endScore = 10;
        number.innerHTML = `Whack ${score}/${endScore} Mosquito`
        run()
    }, 200);
})

againButton.addEventListener("click", () =>{
    playClickSound()
    let daley = setTimeout(() =>{
        final.classList.add("hide")
        start.classList.remove("hide")
    }, 200)
})

homeButton.addEventListener("click", ()=>{
    playClickSound()
    let daley = setTimeout(() =>{
        location.assign('https://gimme.sg/activations/dementia/');
    }, 200)
})

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    timer = null;

    img = document.createElement("img")
    img.classList.add("mosquito")
    hole.classList.add("m")
    img.src = "./img/mosquito.png"
    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        hole.classList.remove("m")
        run()
    }, 2500)
}

for(let b = 0; b < holes.length; b++){
    holes[b].addEventListener("click", ()=>{
        if(holes[b].classList.contains("m")){
            correct.currentTime = 0
            correct.play()
            holes[b].classList.remove("m")
            score +=1;
            number.innerHTML = `Whack ${score}/${endScore} Mosquito`
            img.src = "./img/mosquitoW.png"
            clearTimeout(timer)
            setTimeout(() => {
                holes[b].removeChild(img)
                checkWin()
            },1000)
        }
        if(!holes[b].classList.contains("m")){
            wrong.currentTime = 0
            wrong.play()
        }
    })
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function checkWin(){
    if(score == endScore){
        final.classList.remove("hide")
        game.classList.add("hide")
    }
    else{
        run()
    }
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });