//user choose playerBadge wilson picture
//user2 choose playerBadge wilson picture

//make playerBadge wilson class with BG to the grid, when clicked change style of the div to playerBadge wilson
//create function to calculate rows of playerBadge wilson
//make function to add playerBadge wilson picture


var playNumber = 0;

var boxes = document.querySelectorAll('.box');

var playerOneBadge = 'owen1'
var playerTwoBadge = 'owen2'
var playerBadge = 0;


var match = {
  checkRows: function(playerBadge){
    var k = 0
    for (i = 0; i < 3; i++) {
      var row = []
      
      for (j = 0; j < 3; j++) {
        if (boxes[k + j].classList.contains(playerBadge)) {
          row.push(playerBadge);
        }
      }

      if (row.length === 3) {
        match.addScore()
      }
      k += 3
    }
  },
  checkColumns: function(playerBadge){
    var l = 0;
    for (m = 0; m < 3; m++){
      var row = []
      
      for (var n = 0; n < 9; n += 3) {
        if (boxes[n + l].classList.contains(playerBadge)) {
          row.push(playerBadge);
        }
      }
      if (row.length === 3) {
        match.addScore()
      }
      l += 1
    }
  },
  checkDiagonalToLeft: function(playerBadge){  
    var line = [];
    
    for (i = 2; i < 8; i+=2) {
      if (boxes[i].classList.contains(playerBadge)){
        line.push(playerBadge)
      }   
    }

    if (line.length === 3) {
      match.addScore()
    }
  }, 
  checkDiagonalToRight: function(playerBadge){
    var line = [];
    
    for (i = 0; i <= 8; i+=4) {
      if (boxes[i].classList.contains(playerBadge)){
        line.push(playerBadge)
      }   
    }

    if (line.length === 3) {
      match.addScore()
    }
  },
  checkMatch: function(playerBadge){
    match.checkRows(playerBadge)
    match.checkColumns(playerBadge)
    match.checkDiagonalToLeft(playerBadge)
    match.checkDiagonalToRight(playerBadge)
  },
  addScore: function(){
    boxes.forEach(function(box){box.classList.add('taken')})
    var playerScore = document.querySelectorAll('.player-score')
    if (playNumber % 2 === 0) {
      playerScore[1].textContent = Number(playerScore[1].textContent) + 1
    } else {
      playerScore[0].textContent = Number(playerScore[0].textContent) + 1
    }
  },
}

function addplayerBadge(event){
  if (playNumber % 2 === 0) {
    var playerBadge = playerOneBadge;
  } else {
    var playerBadge = playerTwoBadge;
  }
  if (!event.target.classList.contains('taken')){
  event.target.classList.add(playerBadge)
  event.target.classList.add('taken')
  playNumber += 1;
  playWow()
  match.checkMatch(playerBadge)
  } 
}

function playWow(){
  var randomWow = Math.floor(Math.random() * 9);
  document.querySelectorAll('audio')[randomWow].play()
}

function resetGame(){
  boxes.forEach(function(box){
    playNumber = 0
    box.classList.add('fade')
    setTimeout(
      function(){
        box.className = 'box';
        box.classList.remove('fade')
      }, 600)
  })
}

function createOwen (){
  randomOne = Math.floor((Math.random() * 100) + 1);
  randomTwo = Math.floor((Math.random() * 100) + 1);
  randomThree = Math.floor((Math.random() * 16) + 4);
  randomFour = Math.floor((Math.random() * 360) + 1);
  var littleOwen = document.createElement('div')
  littleOwen.style = "position: fixed;" + "top: " + randomOne + "vh;" + "right: " + randomTwo + "vw; background: url('./img/owin.png'); width: " + randomThree + "vh; height: " + randomThree + "vh; background-size: cover; transition: all 1s ease;" + "transform: rotate(" + randomFour + "deg);" 
  document.querySelector('main').appendChild(littleOwen)
  setTimeout(function(){
    randomOne = Math.floor((Math.random() * 100) + 1);
    randomTwo = Math.floor((Math.random() * 100) + 1);      
    randomFour = Math.floor((Math.random() * 360) + 1);
    randomThree = Math.floor((Math.random() * 16) + 4);
    littleOwen.style = "position: fixed;" + "top: " + randomOne + "vh;" + "right: " + randomTwo + "vw; background: url('./img/owin.png'); width: " + randomThree + "vh; height: " + randomThree + "vh; background-size: cover; transition: all 1s ease;" + "transform: rotate(" + randomFour + "deg);"
  }, 200)
}

var hundredOwens = setInterval(createOwen, 100);

function stopOwens(){
  clearInterval(hundredOwens)
}


document.querySelector('.wrapper').addEventListener('click', function(event){
  if (event.target.classList.contains('box')) {
    addplayerBadge(event);
  }
});

document.querySelector('.fa-undo').addEventListener('click', resetGame)