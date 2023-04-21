// Canvas variables
var canvas;
var canvasContext;

// Ball variables
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

// Paddle variables
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

// Score variables
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

// Function to calculate mouse position relative to the canvas
function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

// Function to reset the ball after each round
function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    player1Score = 0;
    player2Score = 0;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

// Function to move the computer paddle
function computerMovement() {
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

// Main game function
function drawEverything() {
  // Draw the canvas
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  canvasContext.fillStyle = "rgb(27, 147, 35)";
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  canvasContext.fill();

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce the ball off the top and bottom edges
  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Bounce the ball off the left paddle
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++;
      ballReset();
    }
  }

  // Bounce the ball off the right paddle
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      ballReset();
    }
  }

  // Draw the left paddle
  canvasContext.fillStyle = "rgb(27, 147, 35)";
  canvasContext.fillRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

  // Draw the right paddle
  canvasContext.fillStyle = "rgb(27, 147, 35)";
  canvasContext.fillRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

  // Draw the net
  canvasContext.fillStyle = "rgb(27, 147, 35)";
  for (var i = 0; i < canvas.height; i += 10) {
    canvasContext.fillRect(canvas.width / 2 - 1, i, 2, 20);
  }

  // Draw the scores
  canvasContext.fillStyle = "rgb(27, 147, 35)";
  canvasContext.font = "20px cutive mono";
  canvasContext.fillText("Neo: " + player1Score, 100, 100);
  canvasContext.fillText("Agent Smith: " + player2Score, canvas.width - 200, 100);

  // Increase the speed of the ball after each round
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    ballSpeedX = 0;
    ballSpeedY = 0;
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Click to continue", canvas.width / 2 - 100, canvas.height / 2);
  } else {
    computerMovement();
  }
}

// Function to start the game
function startGame() {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");

  // Set the game loop
  var framesPerSecond = 60; // SPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEED
  setInterval(function() {
    drawEverything();
  }, 1000 / framesPerSecond);

  // Listen for mouse movement
  canvas.addEventListener("mousemove", function(evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
  });

  // Listen for click to continue after game over
  canvas.addEventListener("mousedown", function(evt) {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
      player1Score = 0;
      player2Score = 0;
    }
  });
}

// Call the startGame function on window load
window.onload = function() {
  startGame();
};
