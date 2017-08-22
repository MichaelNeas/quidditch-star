var FastPriorityQueue = require("fastpriorityqueue");
var searchQueue = new FastPriorityQueue(compareTravelPriorities);
var visitedSet = new Set();

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

function findSnitch(){
	var currentPath, lastNode;
	while(!searchQueue.isEmpty()){
		currentPath = searchQueue.poll();
		lastNode = currentPath.path[currentPath.length-1];
		lastNode.forEach(function(currentNeighbor){
			visitedSet.add(currentPath);
			var newPath = currentPath.push(currentNeighbor);
		});
	}
	return undefined;
}
