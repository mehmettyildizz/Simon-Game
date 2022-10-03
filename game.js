
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0 ;

$(document).keypress(function() {
  if(!gameStarted){
    $("#level-title").text("Level "+level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function(){ //herhangi bir butona tiklandiginda bu fonksiyona giriyoruz:

    var userChosenColour = $(this).attr("id"); //ustune tiklanilan butonun id'sini aliyoruz.
    userClickedPattern.push(userChosenColour); //id'sini aldigimiz butonu bos array'e atiyoruz.
    playSound(userChosenColour); //hangi butona tiklanildiysa o renkteki butona denk gelen ses calicak.
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4); //0-3 sayi secme.
  var randomChosenColour = buttonColours[randomNumber]; //random sayiya gore renk secme.
  gamePattern.push(randomChosenColour); //secilen rengi array'e atma.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  //secilen renge animasyon ekleme.
  playSound(randomChosenColour);  //secilen renge denk sesi calma.

}

function playSound(colour){  //ses calma fonksiyonu. parametre olarak colour aliyor.
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed"); //tiklanilan butona pressed class'ini ekliyoruz.

  setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
  }, 100); //100 milisaniyeden sonra pressed class'ini butondan siliyoruz. bu sayede kucuk bir flash animasyonu olusuyor.
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]== userClickedPattern[currentLevel]){
    console.log("success!");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  }
  else{
    console.log("wrong!");
    playSound("wrong");

    $('body').addClass("game-over"); //body elementine game-over classini ekliyoruz.

    setTimeout(function() {
        $('body').removeClass("game-over");
    }, 200); //200 milisaniyeden sonra game-over class'ini body'deb siliyoruz. bu sayede kucuk bir flash animasyonu olusuyor.

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern=[];
  gameStarted = false;
}
