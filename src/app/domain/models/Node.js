class Node{
  constructor(value=undefined){
    this.Value = value;
    this.Edges = [];
  }

  SetNewEdge(newEdge){
    this.Edges.push(newEdge);
  }

  GetEdgesQuantity(){
    return this.Edges.length;
  }
}

module.exports=Node;
