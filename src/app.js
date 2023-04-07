let num2 = 0;
let firstNum;
let selectedNumber = 2;
let checkIcon = document.getElementById("checkIcon");
let closeIcon = document.getElementById("closeIcon");
checkIcon.style.display = "none";
closeIcon.style.display = "none";
let submitBtn = document.getElementById("submit");
let answerBox = document.getElementById("answerBox");
var timer = document.getElementById("second-timer");
let secondsBox = document.getElementById("seconds");
let second = 0;
let userAnswer;

function randomNum() {
    num2 = Math.floor(Math.random() * 11) + 2;
    return num2;
}

let answer;

function Multiply(secondNum, xVisible, allNum) {
    allNum = randomNum();
    firstNum = document.getElementById("firstNum").innerHTML = selectedNumber;
    if (selectedNumber === "all") {
        document.getElementById("firstNum").innerHTML = allNum;
        firstNum = allNum;
    }
    secondNum = document.getElementById("secNum").innerHTML = randomNum();

    console.log("I chose " + firstNum + " " + secondNum);
    answer = firstNum * secondNum;
    xVisible = document.getElementById("xSign").style.display = "inline";
}

function selectTimesNum() {
    selectedNumber = document.getElementById("number-select").value;
}

submitBtn.addEventListener('click', () => {
    setTimeout(() => {
        answerBox.value = "";
    }, 1250);
});

function Wrong() {
    submitBtn.style.display = "none";
    closeIcon.style.display = "inline-block";
    answerBox.classList.add("wrongBox");
    setTimeout(() => {
        closeIcon.style.display = "none";
        answerBox.classList.remove("wrongBox");
        submitBtn.style.display = "inline-block";
    }, 1250);
}

function Correct() {
    submitBtn.style.display = "none";
    checkIcon.style.display = "inline-block";
    answerBox.classList.add("correctBox");
    setTimeout(() => {
        checkIcon.style.display = "none";
        answerBox.classList.remove("correctBox");
        submitBtn.style.display = "inline-block";
    }, 1250);
}

function CheckAnswer() {
    userAnswer = document.getElementById("answerBox").value;
    console.log(userAnswer + " user answer..");
    setInterval(() => {
        if (userAnswer == undefined || "" || NaN && second == 0) {
            Multiply();
        }
    }, 1000);
    if (userAnswer != answer) {
        Wrong();
        console.log("Wrong");
    } else {
        Correct();
        console.log("Correct! Good Job!")
    }
}

let intervalID;

function StartCounting() {
    intervalID = setInterval(Countdown, 1000);
}

function StopCounting() {
    intervalID = window.clearInterval(intervalID);
}

function Timer() {
    second = document.getElementById("second-timer").value;
    console.log(second + " seconds");
    document.getElementById("seconds").innerHTML = second;
}

function Countdown() {
    if (second === 0) {
        secondsBox.innerHTML = "00";
    } else {
        second = second - 1;
        secondsBox.innerHTML = second;
    }
    if (second.toString().length !== 2 || 3) {
        secondsBox.innerHTML = "0" + second;
    }

    console.log(second + " doing countdown....");
    if (second === 0 && timer.value !== "none") {
        StopCounting();
        console.log("Supposed to stop");
        if (userAnswer === undefined || NaN) {
            Wrong();
            second = timer.value;
            StartCounting();
            console.log("Supposed to start");
        }
    } else if (timer.value !== "none" && userAnswer !== undefined || 0) {
        StopCounting();
        userAnswer = Number(userAnswer);
        console.log(second, userAnswer);
        if (userAnswer !== answer) {
            Wrong();
            StartCounting();
            console.log("This code is running");
        }
        else if (userAnswer === answer) {
            second = timer.value;
            userAnswer = 0;
            StartCounting();
        } 
    }
}

// every second second should go down by 1
// if second doesn't exsist give it a place holder
// when it reaches zero restart
// if you get the question right stop counting reset second, reset userAnswer, start counting again