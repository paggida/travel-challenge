const Route = require('../../domain/models/Route');
const AdjacencyList = require('../../domain/models/AdjacencyList');

module.exports = {
  getConvertRouteStringToArray(routeString){
    const destinations =  routeString.split('-');
    return destinations;
  },
  getConvertRoutesArrayToAdjacencyList(routesArray){
    const nodeArray = [];
    const edgesArray = [];

    for(let [nodeA, nodeB, price] of routesArray){
      const indexA = _setNodeInArrayIfNew(nodeA, nodeArray);
      const indexB = _setNodeInArrayIfNew(nodeB, nodeArray);

      _setEdgeInArray({indexOrigin:indexA, indexTarget:indexB, price}, edgesArray)
      _setEdgeInArray({indexOrigin:indexB, indexTarget:indexA, price}, edgesArray)
    }

    return new AdjacencyList(nodeArray,edgesArray);
  },
  getCheapestRoute(originNode,targetNode, routeAdjacencyList){
    const originNodeIndex = routeAdjacencyList.getNodeIndex(originNode);
    const targetNodeIndex = routeAdjacencyList.getNodeIndex(targetNode);
    const trackPaths = { };
    const nodesIndexPriceArray = Array(routeAdjacencyList.GetNodesQuantity()).fill("Infinity");
    const visitedNodeArray = Array(routeAdjacencyList.GetNodesQuantity()).fill(false);

    // Adds initial data from the first node
    for (let [nodeIndex, weight] of routeAdjacencyList.Edges[originNodeIndex]){
      nodesIndexPriceArray[nodeIndex] = weight;
      trackPaths[routeAdjacencyList.getNodeByIndex(nodeIndex)] = originNode;
    }

    let currentNodeIndex = _getCheapestNode(nodesIndexPriceArray,visitedNodeArray);

    // Navigating the edges
    while(currentNodeIndex>=0){
      let price = nodesIndexPriceArray[currentNodeIndex];

      for (let [nodeIndex, weight] of routeAdjacencyList.Edges[currentNodeIndex]){
        if(nodeIndex!==originNodeIndex){
          let newTotalPriceOfPath = price + weight;

          // Mark lowest prices
          if(nodesIndexPriceArray[nodeIndex]>newTotalPriceOfPath){
            nodesIndexPriceArray[nodeIndex]=newTotalPriceOfPath;
            trackPaths[routeAdjacencyList.getNodeByIndex(nodeIndex)]=routeAdjacencyList.getNodeByIndex(currentNodeIndex);
          }
        }
      }
      visitedNodeArray[currentNodeIndex]=true;
      currentNodeIndex = _getCheapestNode(nodesIndexPriceArray,visitedNodeArray)
    }

    //Get the cheapest path inside de stored paths data
    const cheapestPath = [targetNode];
    let trackCheapestPath = trackPaths[targetNode];
    while(trackCheapestPath){
      cheapestPath.push(trackCheapestPath);
      trackCheapestPath = trackPaths[trackCheapestPath];
    }
    cheapestPath.reverse();

    //Show the best path and the price
    return new Route(cheapestPath,nodesIndexPriceArray[targetNodeIndex]);
  }
}

//Module functions
const _isInvalidIndex = index => index<0;
const _isPriceAMoreExpensiveThanPriceB = (priceA, priceB) => priceA>priceB;

//Node functions
const _isFirstNodeEdge = (nodeIndex, edgesArray) => !edgesArray[nodeIndex];
const _getNodeIndexInArray = (node, nodesArray) => nodesArray.indexOf(node);
const _setNodeInArrayIfNew = (node, nodesArrayOutput)=>{
  let nodeIndex =_getNodeIndexInArray(node, nodesArrayOutput);

  if(_isInvalidIndex(nodeIndex)){
    nodesArrayOutput.push(node);
    nodeIndex = nodesArrayOutput.length-1;
  }

  return nodeIndex;
};
const _getCheapestNode = (priceArray, visitedArray) =>{
  let cheapestNodeIndex = -1;
  let isCurrentCheapestNodeIndex = false;

  // Accepts unvisited nodes index only if there are no edges with lower prices
  for(let nodeIndex=0;nodeIndex<priceArray.length;nodeIndex++){
    isCurrentCheapestNodeIndex = cheapestNodeIndex=== -1 || priceArray[nodeIndex] < priceArray[cheapestNodeIndex];
    if (isCurrentCheapestNodeIndex && !visitedArray[nodeIndex]) {
			cheapestNodeIndex = nodeIndex;
		}
  }

  return cheapestNodeIndex;
}

//Edge Functions
const _isNewEdge = edge => !edge;
const _getEdgeIndexInArray = (edge, nodeIndex, edgesArray) => edgesArray[nodeIndex].indexOf(edge);
const _getEdgeNodeIndexToNodeIndexInArray = (indexA, indexB, edgesArrayOutput) =>{
  return edgesArrayOutput[indexA]? edgesArrayOutput[indexA].find( edge => edge[0]===indexB) : undefined;
};
const _setNewEdgeInNode = (newEdgeArray, nodeIndex, edgesArrayOutput) =>{
  if(_isFirstNodeEdge(nodeIndex, edgesArrayOutput)){
    edgesArrayOutput[nodeIndex] = [];
  }
  edgesArrayOutput[nodeIndex].push(newEdgeArray);
};
const _setLowerPriceInEdge = (edgeIndex, newPrice, nodeIndex, edgesArrayOutput) =>{
  const edge= edgesArrayOutput[nodeIndex][edgeIndex];
  edgesArrayOutput[nodeIndex][edgeIndex]=[edge[0], newPrice];
}
const _setEdgeInArray = (routesObjWithIndex, edgesArrayOutput)=>{
  const {indexOrigin, indexTarget, price:stringPrice} = routesObjWithIndex;
  const price = parseFloat(stringPrice);

  const edgeOrigintoTarget= _getEdgeNodeIndexToNodeIndexInArray(indexOrigin, indexTarget, edgesArrayOutput);

  if(_isNewEdge(edgeOrigintoTarget)){
    _setNewEdgeInNode([indexTarget, price], indexOrigin, edgesArrayOutput);
  }else{
    if(_isPriceAMoreExpensiveThanPriceB(edgeOrigintoTarget[1], price)){
      const edgeOrigintoTargetIndex = _getEdgeIndexInArray(edgeOrigintoTarget, indexOrigin, edgesArrayOutput);
        _setLowerPriceInEdge(edgeOrigintoTargetIndex, price, indexOrigin, edgesArrayOutput);
    }
  }
}
