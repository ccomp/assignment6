// P5 STUFF

var sensor1 = 0;
var sensor2 = 0;
var player;

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
}

function draw() {
	background('lavender');
	// ellipse(width/2, height/2, sensor1, sensor2);
	player.update(sensor1, sensor2);
	player.display();
}

// all non-p5 javascript needs to go inside init 
// so that it executes once the page has loaded
function init(){

	// SOCKET STUFF
	var socket = io.connect();

	socket.on('connect', function() {
		console.log("Connected");
	});

	socket.on('sensor', function(data){
		console.log(data);
		var sensors = split(data, ",");
		sensor1 = Number(sensors[0]);
		sensor2 = Number(sensors[1]);
	});


}

function Player()
{
	this.x = width/2;
	this.y = height/2;
	this.size = 250;
	this.color = 'darkcyan';
	this.display = function()
	{
		fill(this.color);
		noStroke();
		ellipse(this.x, this.y, this.size, this.size);
	}
	this.update = function(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

window.addEventListener('load', init);