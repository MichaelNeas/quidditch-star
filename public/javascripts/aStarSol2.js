const FastPriorityQueue = require('fastpriorityqueue');
let searchQueue = {};
const visitedSet = new Set();
const D = 1;
const D2 = Math.SQRT2;
let gameState = {};

function travel(aPath, aScore){
	return Object.assign({}, {path:[aPath],score:aScore});
};

function compareTravelPriorities(a,b){
    return a.score < b.score;
}

//length of new path
function d(path){
	console.log('path length', path.length);
	return path.length;
}

//heuristic score of neighbornode, diagonal distance
function h(neighborNode){
	let goal = getXY(gameState.state.indexOf("SN"));
	//console.log('goal:', goal);
  var dx = Math.abs(neighborNode[0] - goal[0]);
	var dy = Math.abs(neighborNode[1] - goal[1]);
	//console.log('h val: ', D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy));
  return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
}

//get position
function getPlayerPos(num) {
	let player = `P${num}`;
	let index = gameState.state.indexOf(player);
	return getXY(index);
}

function getXY(index){
	return [
		Math.floor(index/gameState.cols),
		(index%gameState.cols)
	];
}

//get cell in array
function getCell(r,c) {
	//console.log('cell:', gameState.state[(r*gameState.cols) + c]);
	return gameState.state[(r*gameState.cols) + c];
}

//+/- 1 to x and y of node for all neighbors
function getUnvisitedNeighbors(node){
	console.log('node to find: ', node);
	const possibleNeighbors = [
													[node[0]+1,node[1]+1],
													[node[0]+1,node[1]],
													[node[0]+1,node[1]-1],
													[node[0]-1,node[1]+1],
													[node[0]-1,node[1]],
													[node[0]-1,node[1]-1],
													[node[0],node[1]+1],
													[node[0],node[1]-1]
												];
	//console.log('possible neighbors', possibleNeighbors);
	return possibleNeighbors
		.filter(function(node){
			return !visitedSet.has(node.join()) && (node[0] >= 0 && node[1] >= 0) && (node[0] < gameState.rows && node[1] < gameState.cols);
		})
		.reduce(function(acc, curr){
			let cell = getCell(curr[0], curr[1]);
			console.log('da cell: ', cell, 'has is the value for', curr[0], curr[1]);
			if(cell === "SN"){
				acc = [];
				acc.push([curr[0], curr[1]]);
			}
			if(cell === "BL"){
				visitedSet.add([curr[0],curr[1]].join());
			}
			if(cell === "" || cell === null){
				acc.push([curr[0], curr[1]]);
			}
			return acc;
	},new Array());
}

function findSnitch(){
	let currentPath, lastNode;
	while(!searchQueue.isEmpty()){
		currentPath = searchQueue.poll();
		console.log('curr path: ', currentPath);

		lastNode = currentPath.path[currentPath.path.length-1];
		console.log('last node: ', lastNode);

		let unvisitedNeighbors = getUnvisitedNeighbors(lastNode);
		console.log('unvisited neighbors', unvisitedNeighbors);

		for(let i = 0; i< unvisitedNeighbors.length; i++){
			let aNeighbor = unvisitedNeighbors[i];
			console.log('neighbor', aNeighbor);
			visitedSet.add(aNeighbor.join());
			console.log('current visited set size', visitedSet.size);

			let newPath = JSON.parse(JSON.stringify(currentPath)); 
			newPath.path.push(aNeighbor);
			//console.log('new path: ', newPath);
			if(getCell(aNeighbor[0],aNeighbor[1]) === "SN"){
				console.log("FOUND THE SNITCH");
				searchQueue.add(newPath);
				return;
			}else{
				let pathScore = d(newPath.path) + h(aNeighbor);
				newPath.score = pathScore;
				console.log("final new path", newPath);
				//console.log([...visitedSet]);
				searchQueue.add(newPath);
			}
		};
	}
	return undefined;
}

function findDirection(travelObj){
	let newDir = travelObj.path[1];
	let prevDir = travelObj.path[0];
	let r = newDir[0]-prevDir[0];
	let c = newDir[1]-prevDir[1];
	
	if(r === -1 && c === -1)
		return "NW";
	if(r === -1 && c === 0)
		return "N";
	if(r === -1 && c === 1)
		return "NE";
	if(r === 1 && c === -1)
		return "SW";
	if(r === 1 && c === 0)
		return "S";
	if(r === 1 && c === 1)
		return "SE";
	if(r === 0 && c === 1)
		return "E";
	if(r === 0 && c === -1)
		return "W";
}

function tester(response){
	//console.log('response', response);
	gameState = response;
	visitedSet.clear();
	searchQueue = new FastPriorityQueue(compareTravelPriorities);
	visitedSet.add(getPlayerPos(0).join());
	searchQueue.add(travel(getPlayerPos(0),1));
	findSnitch();
	console.log(searchQueue.peek());
	const snitchalg = searchQueue.poll();
	//console.log('best',snitchalg);
	let dir = findDirection(snitchalg);
	searchQueue.trim(); // (optional) optimizes memory usage
	return new Promise(function(resolve,reject){resolve(dir)});
};

module.exports = {
	tester: tester
};