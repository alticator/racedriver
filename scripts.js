// Alticator 2020

// Debugging Mode
var debugMode = 1;
function debugMessage(message) {
	if (debugMode == 1) {
		console.log(message);
	}
}

// Shorten document.getElementById to getId
function getId(id) {
	document.getElementById(id);
}

// Declare Variables
debugMessage("Start");

if (debugMode == 1) {
	console.log("Debugging Mode ON");
}
else {
	console.log("Debugging Mode OFF");
}

var mouse = {
	x: 0,
	y: 0,
	down: false
};

function updateMousePosition(event) {
	mouse.x = convertToPercent("width", event.clientX);
	mouse.y = convertToPercent("height", event.clientY);
}

function mouseUp() {
	mouse.down = false;
}

function mouseDown() {
	mouse.down = true;
}

var keyDown = {
	up: false,
	down: false,
	left: false,
	right: false
};

function keyPress(event) {
	if (event.key == "ArrowUp") {
		keyDown.up = true;
	}
	else if (event.key == "ArrowDown") {
		keyDown.down = true;
	}
	else if (event.key == "ArrowLeft") {
		keyDown.left = true;
	}
	else if (event.key == "ArrowRight") {
		keyDown.right = true;
	}
}

function keyUp(event) {
	if (event.key == "ArrowUp") {
		keyDown.up = false;
	}
	else if (event.key == "ArrowDown") {
		keyDown.down = false;
	}
	else if (event.key == "ArrowLeft") {
		keyDown.left = false;
	}
	else if (event.key == "ArrowRight") {
		keyDown.right = false;
	}
}

document.onmousemove = updateMousePosition;
document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onkeydown = keyPress;
document.onkeyup = keyUp;

// Game Menu
var gameMenu = {
	background: 0,
	container: 0,
	title: 0,
	interval: 0,
	buttonText: 0,
	set: function() {
		clearObjects();
		this.background = new rect(0, 0, 100, 100, "#00D0FF");
		this.container = new rect (0, 20, 100, 80, "rgba(255, 255, 255, 0.6)");
		this.title = new textObj("Alticator Racedriver", 50, 10, "5vh Arial", "white", "center");
		this.buttonText = new textObj("Start Game", 50, 60, "10vh Arial", "#00d0ff", "center");
		this.interval = setInterval(this.update, 20);
	},
	quit: function() {
		clearInterval(this.interval);
	},
	update: function() {
		updateAll();
		if (inside(mouse.x, mouse.y, gameMenu.container) && mouse.down) {
			debugMessage("Start Game Clicked");
			game.start();
			gameMenu.quit();
		}
	}
};

// Game
var game = {
	background: 0,
	road: 0,
	car: 0,
	speed: 0,
	speedometer: 0,
	speedIndicator: 0,
	interval: 0,
	start: function() {
		clearObjects();
		this.background = new rect(0, 0, 100, 100, "#00c025");
		this.road = new rect(45, 0, 10, 100, "gray");
		this.car = new imageObj(48, 50, 4, 10, "car.png");
		this.speedometer = new circle(88, 76, 20, "teal");
		this.speedIndicator = new textObj("0", 88, 78, "5vh Arial", "white", "center");
		this.interval = setInterval(this.update, 20);
	},
	update: function() {
		updateAll();
		if (keyDown.up && game.speed < 250) {
			game.speed += 1;
		}
		else if (game.speed > 4) {
			game.speed -= 0.25;
		}
		else {
			game.speed = 0;
		}
		
		if (keyDown.down && game.speed > 4) {
			game.speed -= 3;
		}
		game.speedIndicator.string = Math.round(game.speed);
	},
	quit: function() {
		clearInterval(this.interval);
	}
};

// Start Game Menu or Game If On Debug Mode
if (debugMode == 1) {
	game.start();
}
else {
	gameMenu.set();
}