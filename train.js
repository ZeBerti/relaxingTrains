
let maxTrain = 5;
let maxGleis = 4;

var allGleis = []
var allZug = [];

// imageClasses
var regio1Image = "regio1";
var iceImage = "ice";
var shinkansenImage = "shinkansen";
var cybertruck = "cybertruck";


// Train Objects
function Train(name, speed, delayTillStart, stationTimeMs, animation1Duration, animation2Duration, imageClass, platform) {
  
  this.name = name;
  this.speed = speed;
  this.delayTillStart = delayTillStart;
  this.stationTime = stationTimeMs;
  this.animation1Duration = animation1Duration;
  this.animation2Duration = animation2Duration;
  this.imageClass = imageClass;
  this.platform = platform;
  this.testRandom = function(){ return 2222;};
}


function startSimulation () {
	// do not allow manual inputs
	disableAllButtons();
	
	// start 
	createAllGleis();
	initAllZug();
}

function initAllZug(){
	
	// Wir erstellen eine Zug-Menge zunächst von Hand
	// name, speed, delayTillStart, stationTimeMs, animation1Duration, animation2Duration, imageClass, platform
	let regio = new Train("Regio1", 			 90, 3000, 4000, 10000, 14200, regio1Image, 	null);
	let ice = new Train("ICE1", 				250, 6000, 5000, 12000, 10200, iceImage, 	   	null);
	let shinkansen = new Train("Shinkansen1", 	250, 8000, 6000, 12000, 10200, shinkansenImage, null);
	let tesla = new Train("Cyber1", 		250, 12000,5000, 5000, 5000, cybertruck, null);
	

	allZug.push(regio);
	allZug.push(ice);
	allZug.push(shinkansen);
	allZug.push(tesla);

	startTrafficManager();		
}


function startTrafficManager() {

	allZug.forEach(function(zug, index) {
		
		// ToDo: Set Start Delay
		//setTimeout(function(){ startTrain(zug); }, getRandom(1500, zug.delayTillStart * 2) );
		setTimeout(function(){ startTrain(zug); }, getRandom(0, 5000) );
	});
	
}

function createAllGleis() {
	// <img id="train2" class="train-off train ice gleis2">

	for (i = 0; i < maxGleis; i++) {

		let trainArea = document.getElementById("train-area");
		
		let gleisarea = document.createElement("div");
		gleisarea.id = "gleisarea" + (i+1);
		
		let newImg = document.createElement("img");
		newImg.className = "train train-off";
		newImg.id = "gleis" + (i+1);
		//trainArea.appendChild(newImg);
		gleisarea.appendChild(newImg);
		
		let signal = document.createElement("img");
		signal.id = "signal" + (i+1);
		signal.className = "signal signal-rot";
		gleisarea.appendChild(signal);

		trainArea.appendChild(gleisarea);
		allGleis.push(newImg);
		
	}
}

function getFreiesGleis () {
	let freieGleiseIndex = [];
	for (i = 0; i < maxGleis; i++) {
		if(allGleis[i].classList.contains("train-off")) {
			console.log("freies Gleis: " + (i+1));
			freieGleiseIndex.push(i);
		}
	}
	
	if(freieGleiseIndex.length <= 0)
		return -1;

	let randomPosition = getRandom(0, freieGleiseIndex.length);
	
	// Gleis blockieren
	let gleisIndex = freieGleiseIndex[randomPosition];
	
	console.log("random: " + randomPosition);
	console.log("Freies Gleis aus Menge " + freieGleiseIndex + ": " + gleisIndex);
	allGleis[gleisIndex].classList.remove("train-off");
	return allGleis[gleisIndex];
}

function disableAllButtons () {
	let allButtons = document.getElementsByTagName("button");

	for (let item of allButtons) {
		item.classList.add("disabled");
		item.disabled = true;
	}
}

function startTrain(zug) {
	
	// Freies Gleis suchen
	zug.platform = getFreiesGleis();
	console.log("Zug " + zug.name + " erhält Gleis: " + zug.platform.id);

	let gleis = zug.platform;
	
	if(gleis <= 0){
		console.error("No free Track found");
	} else {
		// Signal grün
		setGleisFrei(gleis);
		
		gleis.classList.add("travel-left-to-station");
		gleis.classList.add(zug.imageClass);
		//setTimeout(function(){ parkTrain(gleis); }, animationTime);
		setTimeout(function(){ continueTrain(zug); }, zug.stationTime + zug.animation1Duration);
	}
}

function setGleisFrei (gleis) {
	let gleisnummer = gleis.id.slice(-1);
	let signal = document.getElementById("signal" + gleisnummer);
	signal.classList.replace("signal-rot", "signal-green");
}

function setGleisBelegt (gleis) {
	let gleisnummer = gleis.id.slice(-1);
	let signal = document.getElementById("signal" + gleisnummer);
	signal.classList.replace("signal-green", "signal-rot");
}


function continueTrain(zug) {
	let gleis = zug.platform;
	gleis.classList.replace("travel-left-to-station", "travel-station-to-right");
	setGleisBelegt(gleis);
	
	setTimeout(function(){ parkTrain(zug); }, zug.animation2Duration);
}


function getRandom(min, max) {
	let rand = Math.floor(Math.random() * max) + min;
	console.log("Random number: " + rand);
	return rand;
}

function parkTrain(zug) {
	
	let gleis = zug.platform;
	zug.platform = null;
	
	
	gleis.className = "train train-off";

console.log("Zug wird geparkt: ");
console.log(zug);

	// Remove all train classes from gleis
	
	setTimeout (function() { startTrain(zug)}, zug.delayTillStart);
}

