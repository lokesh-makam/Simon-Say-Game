let gameSeq = [];
let userSeq = [];
let level = 0;
let start = false;
let colors = ["green", "yellow", "red", "blue"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!start) {
        start = true;
        levelUp();
        enableButtonClicks();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("gflash");
    setTimeout(function () {
        btn.classList.remove("gflash");
    }, 100);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * colors.length);
    let randDiv = colors[randIdx];
    let colorbox = document.querySelector(`#${randDiv}`);
    btnFlash(colorbox);
    gameSeq.push(randDiv);
    userSeq = [];
}

function checkSeq(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        h2.innerHTML = `GAME OVER! <br>Your score was ${level - 1} <br> Press any key to start again`;
        gameSeq = [];
        userSeq = [];
        start = false;
        level = 0;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#d7d5be";
        }, 200);
        disableButtonClicks();
    }
}

function btnClick() {
    let curBtn = this;
    userFlash(curBtn);
    userSeq.push(curBtn.getAttribute("id"));
    checkSeq(userSeq.length - 1);
}

function enableButtonClicks() {
    let bt = document.querySelectorAll('.btn');
    for (let btn of bt) {
        btn.addEventListener("click", btnClick);
    }
}

function disableButtonClicks() {
    let bt = document.querySelectorAll('.btn');
    for (let btn of bt) {
        btn.removeEventListener("click", btnClick);
    }
}
