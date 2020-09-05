class AdjacencyList{
	constructor(nodesValueArray=[]){
    this.Nodes = nodesValueArray;
  }

  GetNodesQuantity(){
    return this.Nodes.length;
  }

  IsKnownNode(NodeIndex){
    return NodeIndex<this.GetNodesQuantity();
  }

  SetNewNode(node){
    this.Nodes.push(node);
  }
  SetNewNodesInBlock(nodesValueArray=[]){
    nodesValueArray.forEach( node => this.SetNewNode(node) );
  }

  PrintGraph(){
    this.Nodes.forEach( (node, index) => console.log(index, node));
  }
}

module.exports=AdjacencyList;
