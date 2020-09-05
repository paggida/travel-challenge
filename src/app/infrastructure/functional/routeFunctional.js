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

