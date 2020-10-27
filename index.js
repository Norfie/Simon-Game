var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["green", "red", "yellow", "blue"];

var start = false;

var level = 0;


$(document).keypress(function() {
  if (!start) {
    if ($("body").hasClass("game-over")) {
      $("body").removeClass("game-over");
    }
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function checkAnswer(levelIndex) {
  if (gamePattern[levelIndex] != userClickedPattern[levelIndex]) {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("You lose! Press Any Key to Start again");
    gamePattern = [];
    level = 0;
    start = false;
  }

  if (gamePattern.length === userClickedPattern.length){
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var chosenButton = buttonColors[randomNum];

  gamePattern.push(chosenButton);

  $("#" + chosenButton).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenButton);
  animatePress(chosenButton);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
