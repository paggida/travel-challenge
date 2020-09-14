import Route from '../../domain/models/Route';
import AdjacencyList from '../../domain/models/AdjacencyList';
import IAdjacencyList from '../../domain/contracts/IAdjacencyList';
import IEdge from '../../domain/contracts/IEdge';

export const getConvertRouteStringToArray=(routeString:string)=> {
  const destinations:string[] =  routeString.split('-');
  return destinations;
};

export const getConvertRoutesArrayToAdjacencyList=(routesArray:string[][])=> {
  const nodeArray:string[] = [];
  const edgesArray:Array<[[number,number]]> = [];

  for(let [nodeA, nodeB, priceString] of routesArray){
    const indexA = _setNodeInArrayIfNew(nodeA, nodeArray);
    const indexB = _setNodeInArrayIfNew(nodeB, nodeArray);

    _setEdgeInArray({indexOrigin:indexA, indexTarget:indexB, price: parseFloat(priceString)}, edgesArray);
    _setEdgeInArray({indexOrigin:indexB, indexTarget:indexA, price: parseFloat(priceString)}, edgesArray);
  }

  return new AdjacencyList(nodeArray,edgesArray);
};

export const getCheapestRoute=(originNode:string,targetNode:string, routeAdjacencyList:IAdjacencyList)=> {
  const originNodeIndex:number = routeAdjacencyList.GetNodeIndex(originNode);
  const targetNodeIndex:number = routeAdjacencyList.GetNodeIndex(targetNode);
  const trackPaths:any = { };
  const nodesIndexPriceArray:number[] = Array(routeAdjacencyList.GetNodesQuantity()).fill("Infinity");
  const visitedNodeArray:boolean[] = Array(routeAdjacencyList.GetNodesQuantity()).fill(false);

  // Adds initial data from the first node
  for (let [nodeIndex, weight] of routeAdjacencyList.Edges[originNodeIndex]){
    nodesIndexPriceArray[nodeIndex] = weight;
    trackPaths[routeAdjacencyList.GetNodeByIndex(nodeIndex)] = originNode;
  }

  let currentNodeIndex:number = _getCheapestNode(nodesIndexPriceArray,visitedNodeArray);

  // Navigating the edges
  while(currentNodeIndex>=0){
    let price = nodesIndexPriceArray[currentNodeIndex];

    for (let [nodeIndex, weight] of routeAdjacencyList.Edges[currentNodeIndex]){
      if(nodeIndex!==originNodeIndex){
        let newTotalPriceOfPath = price + weight;

        // Mark lowest prices
        if(nodesIndexPriceArray[nodeIndex]>newTotalPriceOfPath){
          nodesIndexPriceArray[nodeIndex]=newTotalPriceOfPath;
          trackPaths[routeAdjacencyList.GetNodeByIndex(nodeIndex)]=routeAdjacencyList.GetNodeByIndex(currentNodeIndex);
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
};

//Module functions
const _isInvalidIndex = (index:number):boolean=> index<0;
const _isPriceAMoreExpensiveThanPriceB = (priceA:number, priceB:number):boolean => priceA>priceB;

//Node functions
const _isFirstNodeEdge = (nodeIndex:number, edgesArray:Array<[[number,number]]>):boolean => !edgesArray[nodeIndex];
const _getNodeIndexInArray = (node:string, nodesArray:string[]):number => nodesArray.indexOf(node);
const _setNodeInArrayIfNew = (node:string, nodesArrayOutput:string[]):number =>{
  let nodeIndex:number =_getNodeIndexInArray(node, nodesArrayOutput);

  if(_isInvalidIndex(nodeIndex)){
    nodesArrayOutput.push(node);
    nodeIndex = nodesArrayOutput.length-1;
  }

  return nodeIndex;
};
const _getCheapestNode = (priceArray:number[], visitedArray:boolean[]):number =>{
  let cheapestNodeIndex:number = -1;
  let isCurrentCheapestNodeIndex:boolean = false;

  // Accepts unvisited nodes index only if there are no edges with lower prices
  for(let nodeIndex=0;nodeIndex<priceArray.length;nodeIndex++){
    isCurrentCheapestNodeIndex = cheapestNodeIndex=== -1 || priceArray[nodeIndex] < priceArray[cheapestNodeIndex];
    if (isCurrentCheapestNodeIndex && !visitedArray[nodeIndex]) {
      cheapestNodeIndex = nodeIndex;
    }
  }

  return cheapestNodeIndex;
};

//Edge Functions
const _isNewEdge = (edge:[number,number]):boolean=> edge[0]<0 && edge[1]<0 ;
const _getEdgeIndexInArray = (edge:[number,number], nodeIndex:number, edgesArray:Array<[[number,number]]>):number => edgesArray[nodeIndex].indexOf(edge);
const _getEdgeNodeIndexToNodeIndexInArray = (indexA:number, indexB:number, edgesArrayOutput:Array<[[number,number]]>):[number,number]=>{
  if(edgesArrayOutput[indexA]){
    const edge = edgesArrayOutput[indexA].find( (edge:[number,number])=> edge[0]===indexB);
    if(edge){
      return edge;
    }
  }
  return [-1,-1];
};
const _setNewEdgeInNode = (newEdgeArray:[number,number], nodeIndex:number, edgesArrayOutput:Array<[[number,number]]>):void => {
  if(_isFirstNodeEdge(nodeIndex, edgesArrayOutput)){
    edgesArrayOutput[nodeIndex] = [newEdgeArray];
  }else{
    edgesArrayOutput[nodeIndex].push(newEdgeArray);
  }

};
const _setLowerPriceInEdge = (edgeIndex:number, newPrice:number, nodeIndex:number, edgesArrayOutput:Array<[[number,number]]>):void => {
  const edge= edgesArrayOutput[nodeIndex][edgeIndex];
  edgesArrayOutput[nodeIndex][edgeIndex]=[edge[0], newPrice];
};
const _setEdgeInArray = (routesObjWithIndex:IEdge, edgesArrayOutput:Array<[[number,number]]>):void => {
  const { indexOrigin, indexTarget, price } = routesObjWithIndex;

  const edgeOrigintoTarget= _getEdgeNodeIndexToNodeIndexInArray(indexOrigin, indexTarget, edgesArrayOutput);

  if(_isNewEdge(edgeOrigintoTarget)){
    _setNewEdgeInNode([indexTarget, price], indexOrigin, edgesArrayOutput);
  }else{
    if(_isPriceAMoreExpensiveThanPriceB(edgeOrigintoTarget[1], price)){
      const edgeOrigintoTargetIndex = _getEdgeIndexInArray(edgeOrigintoTarget, indexOrigin, edgesArrayOutput);
        _setLowerPriceInEdge(edgeOrigintoTargetIndex, price, indexOrigin, edgesArrayOutput);
    }
  }
};
