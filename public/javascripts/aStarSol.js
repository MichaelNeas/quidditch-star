(function AStar(){
  function travel(aPath, aScore){
    return Object.assign({}, {path:aPath,score:aScore});
  };

  function compareTravelPriorities(a,b){
    if(a.score > b.score)
      return 1;
    if(a.score < b.score)
      return -1;
    return 0;
  }

  function PriorityQueue(){
    let state = [];
    return {
      dequeue: function(){
        return state.shift();
      },
      enqueue: function(val){
        state.push(val);
        state.sort(compareTravelPriorities);
        return;
      },
      getState: function(){
        return state;
      },
      isEmpty: function(){
        return state.length === 0;
      },
      peekMin: function(){
        return state[0].score;
      }
    };
  }

  let SearchQueue = PriorityQueue();
  console.log(SearchQueue.enqueue(travel([],8)));
  console.log(SearchQueue.getState());
  console.log(SearchQueue.enqueue(travel([],6)));
  console.log('Min', SearchQueue.peekMin());
  console.log(SearchQueue.enqueue(travel([],2)));
  console.log(SearchQueue.getState());
  console.log(SearchQueue.dequeue());
  console.log(SearchQueue.getState());
  
})();