const FastPriorityQueue = require('fastpriorityqueue');
const searchQueue = new FastPriorityQueue(compareTravelPriorities);
const visitedSet = new Set();
const D = 1;
const D2 = Math.SQRT2;

function travel(aPath, aScore){
	return Object.assign({}, {path:aPath,score:aScore});
};

function compareTravelPriorities(a,b){
    return a.score < b.score;
}

function aye(){
	searchQueue.add(travel([],1));
	searchQueue.add(travel([],0));
	searchQueue.add(travel([],8));
	searchQueue.add(travel([],4));
	searchQueue.add(travel([],3));
	console.log(searchQueue.peek()); // should return 0, leaves searchQueue unchanged
	console.log(searchQueue.size); // should return 5, leaves searchQueue unchanged
	while(!searchQueue.isEmpty()) {
		console.log(searchQueue.poll());
	} // will print 0 1 3 4 5
	console.log(searchQueue.size);
	searchQueue.trim(); // (optional) optimizes memory usage

};

aye();

//length of new path
function d(path){
	return path.size;
}

//heuristic score of neighbornode, diagonal distance
function h(neighborNode){
    var dx = abs(node.x - goal.x);
    var dy = abs(node.y - goal.y);
    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
}

//get position
//+/- 1 to x and y of node for all neighbors
function getNeighbors(node){

}

function findSnitch(){
	let currentPath, lastNode;
	while(!searchQueue.isEmpty()){
		currentPath = searchQueue.poll();
		lastNode = currentPath.path[currentPath.length-1];
		lastNode.forEach(function (currentNeighbor){
			visitedSet.add(currentPath);
			let newPath = currentPath.push(currentNeighbor);
			if(currentNeighbor.contents === "SN")
				return newPath;
			else{
				pathScore = d(newPath) + h(currentNeighbor);
				searchQueue.add(travel(newPath, pathScore));
			}

		});
	}
	return undefined;
}
