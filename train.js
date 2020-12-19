var animationTime = 8000;
var pauseInMs = 5000;
var retentionTime=8000;


var gleis1 = null;
var gleis2 = null;
var gleis3 = null;
var gleis4 = null;

let maxTrain = 5;
let maxGleis = 5;

var allGleis = []
var allZug = [];


function startSimulation () {
	// do not allow manual inputs
	disableAllButtons();
	
	// start 
	initAllZug();
	
}

function initAllZug(){
	for (i = 0; i < maxTrain; i++) {
		let train = document.getElementById("train" + i);
		if(train != null) {
			allZug.push(train);
		}
	}
	
	// starte Timer für jeden Zug
	allZug.forEach(function(item, index) {
		//startTrain
		
		
	});
	
	// 1. Wähle einen parkenden Zug
	// 2. Suche ein zufalls freies Gleis (sonst warteschleife)
	let freiesGleis = getFreiesGleis();
	 // todo auf -1 prüfen
	 
	// 3. lasse den Zug auf das Gleis fahren
	
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

function startTrain(train) {
	train.classList.replace("train-off", "travel-left-to-station");
	//setTimeout(function(){ parkTrain(train); }, animationTime);
	setTimeout(function(){ continueTrain(train); }, animationTime + pauseInMs);
		
}

function continueTrain(num) {
	let train = document.getElementById("train"+num);
	train.classList.replace("travel-left-to-station", "travel-station-to-right");
	
	setTimeout(function(){ parkTrain(train); }, retentionTime);
}

function continueTrainWithNumber(num) {
	let train = document.getElementById("train"+num);
	continueTrain(train);
}

function continueTrain(train) {
	train.classList.replace("travel-left-to-station", "travel-station-to-right");	
	setTimeout(function(){ parkTrain(train); }, retentionTime);
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

function parkTrain(train) {
	train.classList.replace("travel-left-to-station", "train-off");
		train.classList.replace("travel-station-to-right", "train-off");
}