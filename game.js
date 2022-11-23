var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
started = false;

$(document).keypress(function (e) {

    if (started === false) {
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {

    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});



function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            console.log("Success");
        }
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over. Press any key to restart.")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 100);

        startOver();
    }
}



function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text("Level " + level);
    var num = 4;
    num = Math.floor(Math.random() * num);
    var randomChosenColor;
    randomChosenColor = buttonColors[num];
    gamePattern.push(randomChosenColor);
    buttonEffect(randomChosenColor);
}

function animatePress(currentColor) {

    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100);
    // $("." + currentColor).removeClass("pressed");

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}






function buttonEffect(randomChosenColor) {
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}









