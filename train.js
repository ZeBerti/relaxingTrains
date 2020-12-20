var animationTime = 8000;
var pauseInMs = 5000;
var retentionTime=8000;


var gleis1 = null;
var gleis2 = null;
var gleis3 = null;
var gleis4 = null;

let maxTrain = 5;
let maxGleis = 3;

var allGleis = []
var allZug = [];

// Train Objects
function Train(name, speed, returnPeriodInMs, stationTimeMs, imageClass, track) {
  
  this.trainName = name;
  this.speed = speed;
  this.returnPeriodInMs = returnPeriodInMs;
  this.stationTimeMs = stationTimeMs;
  this.imageClass = imageClass;
  this.track = track;
  
}


function startSimulation () {
	// do not allow manual inputs
	disableAllButtons();
	
	// start 
	createAllHtmlImage();
	initAllZug();
	
}

// this function works for already existing html tags
function initAllZug(){
	
	// Wir erstellen eine Zug-Menge zunächst von Hand
	let regio = new Train("Regio1", 90, 5000, 5000, "regio1", null);
	let ice = new Train("ICE1", 250, 5000, 5000, "ice", null);
	let shinkansen = new Train("Shinkansen1", 250, 5000, 5000, "shinkansen", null);

	allZug.push(regio);
	allZug.push(ice);
	allZug.push(shinkansen);
	
	// starte Timer für jeden Zug
	allZug.forEach(function(item, index) {
		//startTrain
		//let freiesGleis = getFreiesGleis();
		//if(freiesGleisc== -1)
		//	console.error("No free track. Handle this situation as exception!!");
	
		console.log("handling allzug with index " + (index+1));	
		let gleis = document.getElementById("gleis" + (index+1));
		allGleis.push(gleis);
		//<img id="train1" class="train-off train regio gleis1" src="FullTrain.png">
		gleis.classList.add("train", "train-off",item.imageClass);
		
	});
	
	startTrafficManager();
		
}

function startTrafficManager() {
		// Start traffic Manager
	allGleis.forEach(function(item, index) {
		setTimeout(function(){ startTrain(item); }, getRandom(0, 7000) );	
	});
}

// To manage tracks (1 track = 1 html-img)
function createAllHtmlImage() {
	// <img id="train2" class="train-off train ice gleis2">

		for (i = 0; i < maxGleis; i++) {

			let trainArea = document.getElementById("train-area");
			let newImg = document.createElement("img");
			newImg.id = "gleis" + (i+1);
			trainArea.appendChild(newImg);
		}
	

}

function getFreiesGleis () {
	let freieGleise = [];
	for (i = 0; i < maxGleis; i++) { 
		if(allGleis[i]==null)
			freieGleise.push(i);
	}
	if(freieGleise<=0)
		return -1;
	
	let randomPosition = Math.floor(Math.random() * freieGleise.length) + 1;
	
	return freieGleise[randomPosition];
	
}

function disableAllButtons () {
	let allButtons = document.getElementsByTagName("button");

	for (let item of allButtons) {
		item.classList.add("disabled");
		item.disabled = true;
	}
}

function startTrainWithNumber(num) {
	let train = document.getElementById("train"+num);
	startTrain(train);
}

function startTrain(gleis) {
	gleis.classList.replace("train-off", "travel-left-to-station");
	//setTimeout(function(){ parkTrain(gleis); }, animationTime);
	setTimeout(function(){ continueTrain(gleis); }, animationTime + pauseInMs);
		
}

function continueTrain(gleis) {
	gleis.classList.replace("travel-left-to-station", "travel-station-to-right");
	
	setTimeout(function(){ parkTrain(gleis); }, retentionTime);
}

function continueTrainWithNumber(num) {
	let train = document.getElementById("train"+num);
	continueTrain(train);
}

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

function startAllTrain () {
	let allTrain = [];
	let num = 0;
	
	while (document.getElementById("train" + ++num) != null) {
		allTrain.push(document.getElementById("train"+num));	
	}	
	num--;

	for(let i = 1; i<=num; i++) {
		startTrainWithNumber(i);
	}
}

function parkTrain(gleis) {
	gleis.classList.replace("travel-left-to-station", "train-off");
	gleis.classList.replace("travel-station-to-right", "train-off");
	
	setTimeout (function() { startTrain(gleis)}, getRandom(5000,10000));
}