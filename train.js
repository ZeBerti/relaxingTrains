var animationTime = 8000;
var pauseInMs = 5000;
var retentionTime=8000;


var gleis1 = null;
var gleis2 = null;
var gleis3 = null;
var gleis4 = null;

let maxTrain = 5;
let maxGleis = 4;

var allGleis = []
var allZug = [];

// imageClasses
var regio1Image = "regio1";
var iceImage = "ice";
var shinkansenImage = "shinkansen";


// Train Objects
function Train(name, speed, returnPeriodInMs, stationTimeMs, imageClass, track) {
  
  this.name = name;
  this.speed = speed;
  this.delayTillStart = returnPeriodInMs;
  this.stationTime = stationTimeMs;
  this.imageClass = imageClass;
  this.track = track;
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
	let regio = new Train("Regio1", 			 90, 2000, 4000+10000, regio1Image, 	   null);
	let ice = new Train("ICE1", 				250, 4000, 5000+12000, iceImage, 	   null);
	let shinkansen = new Train("Shinkansen1", 	250, 6000, 6000+12000, shinkansenImage, null);

	allZug.push(regio);
	allZug.push(ice);
	allZug.push(shinkansen);

	startTrafficManager();		
}


function startTrafficManager() {

	allZug.forEach(function(zug, index) {
		
		setTimeout(function(){ startTrain(zug); }, getRandom(0, zug.delayTillStart) );
	});
	
}

function createAllGleis() {
	// <img id="train2" class="train-off train ice gleis2">

	for (i = 0; i < maxGleis; i++) {

		let trainArea = document.getElementById("train-area");
		let newImg = document.createElement("img");
		newImg.className = "train train-off";
		newImg.id = "gleis" + (i+1);
		trainArea.appendChild(newImg);
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
	if(freieGleiseIndex.length<=0)
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
	zug.track = getFreiesGleis();
	console.log("Zug " + zug.name + " erhält Gleis: " + zug.track.id);

	let gleis = zug.track;
	
	if(gleis <= 0){
		console.error("No free Track found");
	}
	
	gleis.classList.add("travel-left-to-station");
	gleis.classList.add(zug.imageClass);
	//setTimeout(function(){ parkTrain(gleis); }, animationTime);
	setTimeout(function(){ continueTrain(zug); }, zug.stationTime);
	
}

function continueTrain(zug) {
	let gleis = zug.track;
	gleis.classList.replace("travel-left-to-station", "travel-station-to-right");
	
	setTimeout(function(){ parkTrain(zug); }, retentionTime);
}


function getRandom(min, max) {
	let rand = Math.floor(Math.random() * max) + min;
	console.log("Random number: " + rand);
	return rand;
}

function parkTrain(zug) {
	
	let gleis = zug.track;
	zug.track = null;
	
	
	gleis.className = "train train-off";

console.log("Zug wird geparkt: ");
console.log(zug);

	// Remove all train classes from gleis
	
	setTimeout (function() { startTrain(zug)}, zug.delayTillStart);
}

