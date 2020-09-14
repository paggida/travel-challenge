import IAdjacencyList from '../contracts/IAdjacencyList'

class AdjacencyList implements IAdjacencyList{
  Nodes:string[];
  Edges:number[][][];

	constructor(nodesValueArray:string[]=[],EdgesObjArray:number[][][]=[]){
    this.Nodes = nodesValueArray;
    this.Edges = EdgesObjArray;
  }

  GetNodesQuantity(){
    return this.Nodes.length;
  }

  GetEdgesQuantity(){
    return this.Edges.reduce((acumulador, nodeEdges, index)=>{
      return acumulador + nodeEdges.filter(edge =>edge[0]>index).length
    },0);
  }

  GetNodeEdgesQuantity(nodeValue:string){
    const nodeIndex = this.GetNodeIndex(nodeValue);
    return nodeIndex>=0? this.Edges[nodeIndex].length : -1;
  }

  GetNodeIndex(NodeValue:string){
    return this.Nodes.indexOf(NodeValue);
  }

  GetNodeByIndex(NodeIndex:number){
    return this.Nodes[NodeIndex];
  }

  PrintGraph(){
    console.log(this.Nodes);
    this.Edges.forEach((edges, index:number) => {
      edges.forEach( edge=>{
        console.log(`'${this.Nodes[index]}' connect '${this.Nodes[edge[0]]}' with weight: ${edge[1]}`)
      })
    });
  }
}

export default AdjacencyList;
