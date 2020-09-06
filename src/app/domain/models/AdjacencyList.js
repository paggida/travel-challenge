class AdjacencyList{
	constructor(nodesValueArray=[],EdgesObjArray=[]){
    this.Nodes = nodesValueArray;
    this.Edges = EdgesObjArray;
  }

  GetNodesQuantity(){
    return this.Nodes.length;
  }

  GetEdgesQuantity(){
    return this.Edges.reduce((acumulador, nodeEdges, index)=>{
      return acumulador + nodeEdges.filter(edge=>edge[0]>index).length
    },0);
  }

  GetNodeEdgesQuantity(nodeValue){
    const nodeIndex = this.getNodeIndex(nodeValue);
    return nodeIndex>=0? this.Edges[nodeIndex].length : -1;
  }

  getNodeIndex(NodeValue){
    return this.Nodes.indexOf(NodeValue);
  }

  getNodeByIndex(NodeIndex){
    return this.Nodes[NodeIndex];
  }

  PrintGraph(){
    console.log(this.Nodes);
    this.Edges.forEach((edges, index) => {
      edges.forEach( (edge)=>{
        console.log(`'${this.Nodes[index]}' connect '${this.Nodes[edge[0]]}' with weight: ${edge[1]}`)
      })
    });
  }
}

module.exports=AdjacencyList;
