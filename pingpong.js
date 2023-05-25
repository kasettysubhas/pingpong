let gamebox = document.getElementById("gamebox");
let userPaddle = document.getElementById("userPaddle");
let aiPaddle = document.getElementById("aiPaddle");
let player1 = document.getElementById("score1");
let player2 = document.getElementById("score2");
let ball = document.getElementById("ball");
let btn = document.getElementById("btn");
let userMenu = document.getElementById("userMenu");
var id_moveai = 0;
var id_ball = 0;
// var id_game=0;
//start and stop functioning of game
btn.addEventListener("click", game);

function game() {
    if (btn.innerText == "Start") {
        btn.innerText = "Stop";
        userMenu.style.opacity = 0;
        moveBall();
        moveAiPaddle();
    } else {
        btn.innerText = "Start";
        cancelAnimationFrame(id_ball);
        cancelAnimationFrame(id_moveai);
        cancelAnimationFrame(id_game);

    }
}
let score1 = 0;
let score2 = 0;
console.log(userPaddle.offsetTop);
console.log(aiPaddle.offsetTop);
//key pressing functionality code
let wPressed = false;
let sPressed = false;
window.addEventListener("keydown", keydownHandler);
window.addEventListener('keyup', keyupHandler);

function keydownHandler(e) {
    if (e.key == 'w') {

        wPressed = true;
    } else if (e.key == 's') {
        sPressed = true;
    }
}

function keyupHandler(e) {
    if (e.key == 'w') {
        wPressed = false;
    } else if (e.key == 's') {
        sPressed = false;
    }
}

//action on key pressing
let gameLoop = () => {
    if (wPressed && userPaddle.offsetTop > 43) {
        userPaddle.style.top = userPaddle.offsetTop - 7 + "px";
    } else if (sPressed && userPaddle.offsetTop < (gamebox.offsetHeight - userPaddle.offsetHeight + 37)) {
        userPaddle.style.top = userPaddle.offsetTop + 7 + "px";
    }
    var id_game = requestAnimationFrame(gameLoop);
}
gameLoop();

//ball velocity in 2d
let vx = 4;
let vy = 3;
let v = Math.sqrt(vx * vx + vy * vy);
//ball movement
let reset = () => {
    ball.style.top = 50 + "%";
    ball.style.left = 50 + "%";
    ball.style.transform = `translate(-50%,-50%)`;
}
let moveBall = () => {

    if (ball.offsetTop > userPaddle.offsetTop - userPaddle.offsetHeight / 2 && ball.offsetTop < (userPaddle.offsetTop + userPaddle.offsetHeight / 2)) {
        if (ball.offsetLeft < userPaddle.offsetWidth + 10) {
            vx = -vx;
        }
    } else if (ball.offsetLeft < 0) {
        reset();
        score2++;
        player2.innerText = score2;

    }
    if (ball.offsetTop > aiPaddle.offsetTop - aiPaddle.offsetHeight / 2 && ball.offsetTop < (aiPaddle.offsetTop + aiPaddle.offsetHeight / 2)) {
        if (ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth - 10) {
            vx = -vx;
        }
    } else if (ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth) {
        score1++;
        player1.innerText = score1;
        vx = -vx;
    }
    if (ball.offsetTop < 0) {
        vy = -vy;
    }
    if (ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight) {
        vy = -vy;
    }
    ball.style.left = ball.offsetLeft + vx + "px";
    ball.style.top = ball.offsetTop + vy + "px";
    id_ball = requestAnimationFrame(moveBall);
}
// moveBall();
//aipaddle animation
let moveAiPaddle = () => {
    aiPaddle.style.top = ball.offsetTop + "px";

    id_moveai = requestAnimationFrame(moveAiPaddle);
}