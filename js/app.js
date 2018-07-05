//user choose playerBadge wilson picture
//user2 choose playerBadge wilson picture

//make playerBadge wilson class with BG to the grid, when clicked change style of the div to playerBadge wilson
//create function to calculate rows of playerBadge wilson
//make function to add playerBadge wilson picture


var playNumber = 0;
var currentPlayer = 0;
var playerScore = document.querySelectorAll('.player-score')

var boxes = document.querySelectorAll('.box');
var sides = document.querySelectorAll('.sidebar');

//var playerBadge = 0;
var playerBadges = [];

playerScore[0].textContent = localStorage.getItem('player1Score');
playerScore[1].textContent = localStorage.getItem('player2Score');

var selectScreen = {
  player: document.querySelectorAll('.selector__title'),
  chooseOwen: function(event){
    playerBadges.push(event.target.classList[1])
    selectScreen.player[0].classList.add('fade')
    setTimeout(function(){selectScreen.player[0].classList.add('hidden')},300)
    setTimeout(function(){selectScreen.player[1].classList.toggle('hidden')},300)
    setTimeout(function(){selectScreen.player[1].classList.toggle('fade')},310)
    event.target.style = "opacity: 0.4"
    if (playerBadges.length === 2) {
      selectScreen.setBoard()
    }
  },
  setBoard: function(){
    document.querySelector('section').classList.add('fade')
    setTimeout(function(){document.querySelector('section').classList.add('hidden')}, 300)
    setTimeout(function(){document.querySelector('main').classList.toggle('hidden')}, 310)
    setTimeout(function(){document.querySelector('main').classList.toggle('fade')}, 900)
    setTimeout(function(){document.querySelector('footer').classList.toggle('hidden')}, 300)
    setTimeout(function(){document.querySelector('footer').classList.toggle('fade')}, 900)
  }
}



var match = {
  checkRows: function(){
    var k = 0
    for (i = 0; i < 3; i++) {
      var row = []
      
      for (j = 0; j < 3; j++) {
        if (boxes[k + j].classList.contains(playerBadges[currentPlayer])) {
          row.push(playerBadges[currentPlayer])
        }
      }

      if (row.length === 3) {
        match.addScore()
      }
      k += 3
    }
  },
  checkColumns: function(){
    var l = 0;
    for (m = 0; m < 3; m++){
      var row = []
      
      for (var n = 0; n < 9; n += 3) {
        if (boxes[n + l].classList.contains(playerBadges[currentPlayer])) {
          row.push(playerBadges[currentPlayer])
        }
      }
      if (row.length === 3) {
        match.addScore()
      }
      l += 1
    }
  },
  checkDiagonalToLeft: function(){  
    var line = []
    
    for (i = 2; i < 8; i+=2) {
      if (boxes[i].classList.contains(playerBadges[currentPlayer])){
        line.push(playerBadges[currentPlayer])
      }   
    }

    if (line.length === 3) {
      match.addScore()
    }
  }, 
  checkDiagonalToRight: function(){
    var line = [];
    
    for (i = 0; i <= 8; i+=4) {
      if (boxes[i].classList.contains(playerBadges[currentPlayer])){
        line.push(playerBadges[currentPlayer])
      }   
    }

    if (line.length === 3) {
      match.addScore()
    }
  },
  checkMatch: function(){
    match.checkRows()
    match.checkColumns()
    match.checkDiagonalToLeft()
    match.checkDiagonalToRight()
    endGame.saveGame()
  },
  addScore: function(){
    boxes.forEach(function(box){box.classList.add('taken')})
    
    var hundredOwens = setInterval(endGame.createOwen, 20)
    setInterval(function(){clearInterval(hundredOwens)}, 1000)
    if (playNumber % 2 === 0) {
      playerScore[1].textContent = Number(playerScore[1].textContent) + 1
      return hundredOwens
    } else {
      playerScore[0].textContent = Number(playerScore[0].textContent) + 1
      return hundredOwens
    }
  },
}

var plays = {
  addplayerBadge: function(event){
    if (!event.target.classList.contains('taken')){
    event.target.classList.add(playerBadges[currentPlayer])
    event.target.classList.add('taken')
    playNumber += 1;
    plays.playWow()
    match.checkMatch(playerBadges[currentPlayer])
    plays.changePlayer()

    } 
  },
  changePlayer: function(){
    if (playNumber % 2 === 0) {
      currentPlayer = 0
    } else {
      currentPlayer = 1
    }
    if (currentPlayer === 0){
      document.querySelectorAll('.sidebar')[0].classList.remove('fade')
      document.querySelectorAll('.sidebar')[1].classList.add('fade')
    } else {
      document.querySelectorAll('.sidebar')[1].classList.remove('fade')
      document.querySelectorAll('.sidebar')[0].classList.add('fade')  
    }
    
    
  },
  playWow: function(){
    var randomWow = Math.floor(Math.random() * 14);
    document.querySelectorAll('audio')[randomWow].play()
  },
}

var endGame = {

  resetGame: function(){
    boxes.forEach(function(box){
      playNumber = 0
      plays.changePlayer()
      box.classList.add('fade')
      setTimeout(
        function(){
          box.className = 'box';
          box.classList.remove('fade')
        }, 600)
    })
    document.querySelector('.owin').innerHTML = ''
  },
  createOwen: function (){
    plays.playWow()
    randomOne = Math.floor((Math.random() * 100) + 1)
    randomTwo = Math.floor((Math.random() * 100) + 1)
    randomThree = Math.floor((Math.random() * 16) + 4)
    randomFour = Math.floor((Math.random() * 360) + 1)
    var littleOwen = document.createElement('div')
    littleOwen.style = "position: fixed;" + "top: " + randomOne + "vh;" + "right: " + randomTwo + "vw; background: url('./img/owin.png'); width: " + randomThree + "vh; height: " + randomThree + "vh; background-size: cover; transition: all 1s ease;" + "transform: rotate(" + randomFour + "deg);" 
    document.querySelector('.owin').appendChild(littleOwen)
    setTimeout(function(){
      randomOne = Math.floor((Math.random() * 100) + 1)
      randomTwo = Math.floor((Math.random() * 100) + 1)      
      randomFour = Math.floor((Math.random() * 360) + 1)
      randomThree = Math.floor((Math.random() * 16) + 4)
      littleOwen.style = "position: fixed;" + "top: " + randomOne + "vh;" + "right: " + randomTwo + "vw; background: url('./img/owin.png'); width: " + randomThree + "vh; height: " + randomThree + "vh; background-size: cover; transition: all 1s ease;" + "transform: rotate(" + randomFour + "deg);"
    }, 200)
  },
  saveGame: function(){
    localStorage.setItem('player1Score', playerScore[0].textContent);
    localStorage.setItem('player2Score', playerScore[1].textContent);
  }
}

document.querySelector('.selector').addEventListener('click', function(event){
  if (event.target.classList.contains('option'))
  selectScreen.chooseOwen(event)
})

document.querySelector('.reset').addEventListener('click',function(){
  localStorage.removeItem('player1Score')
  localStorage.removeItem('player2Score')
  playerScore[0].textContent = 0;
  playerScore[1].textContent = 0;
})

document.querySelector('.wrapper').addEventListener('click', function(event){
  if (event.target.classList.contains('box')) {
    plays.addplayerBadge(event);
  }
});

document.querySelector('.owin').addEventListener('click', endGame.resetGame)

document.querySelector('.fa-undo').addEventListener('click', endGame.resetGame)