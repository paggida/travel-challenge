interface IAdjacencyList {
  Nodes: string[];
  Edges: number[][][];

  GetNodesQuantity(): number;
  GetEdgesQuantity(): number;
  GetNodeEdgesQuantity(nodeValue:string):number;
  GetNodeIndex(NodeValue:string):number;
  GetNodeByIndex(NodeIndex:number):string;
  PrintGraph():void;
}

export default IAdjacencyList
