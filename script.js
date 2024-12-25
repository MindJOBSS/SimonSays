const btnList = document.querySelectorAll("button");
const spanList = document.querySelectorAll("span");
let computerPattern = [];
let playerPattern = [];
let level = 0;
let started = false;

window.addEventListener("load" , function() {
    spanList.forEach(function(span , index) {
        setTimeout(function(){
            span.classList.add("appear");
        },300 * (index + 1));
    });
});

setTimeout(function(){
    document.body.addEventListener("click" , function(){
        animateLoading();
        animateUnloading();

    } , {once: true})
} , 6000);


function animateLoading(){
    spanList.forEach(function(span , index) {
        setTimeout(function(){
            span.style.animationName = "dissappear";
        },300 * (index + 1));
    });
    
    let content = document.querySelector(".tail p");
    content.style.animationName = "dissappear";
    content.style.animationIterationCount = 1;
    content.style.animationDirection = "normal";
    content.style.animationDelay = "0s";
    document.querySelector(".main").style.animationName = "dissappear";
    
}

function animateUnloading(){
    setTimeout(function(){
        document.location.href = "./simonsays.html";
    },6000);
}


function animateButton(btn) {
    btn.classList.add("buttonActive");
    setTimeout(() => {
        btn.classList.remove("buttonActive");
    }, 300);
}



function nextSequence() {
    const randomIndex = Math.floor(Math.random() * btnList.length);
    const randomButton = btnList[randomIndex];
    computerPattern.push(randomButton);
    animateButton(randomButton);
}


function incrementLevel() {
    level++;
    document.querySelector(".hero p").textContent = "Level: " + level;
}


function comparePattern(index) {
    return playerPattern[index] === computerPattern[index];
}


function resetGame() {
    alert(`Game Over! You reached level ${level}. Press any key to restart.`);
    started = false;
    computerPattern = [];
    playerPattern = [];
    level = 0;
    document.querySelector(".hero p").textContent = "Press Any Key to Start";
}


function handleButtonClick(btn) {
    animateButton(btn);
    playerPattern.push(btn);

    const currentTurn = playerPattern.length - 1;
    if (!comparePattern(currentTurn)) {
        resetGame();
        return;
    }

    if (playerPattern.length === computerPattern.length) {
        playerPattern = [];
        setTimeout(() => {
            incrementLevel();
            nextSequence();
        }, 1000);
    }
}


function startGame() {
    if (!started) {
        started = true;
        incrementLevel();
        nextSequence();
    }
}


btnList.forEach((btn) => {
    btn.addEventListener("click", () => handleButtonClick(btn));
});


window.addEventListener("keydown", startGame);
