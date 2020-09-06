const AdjacencyList = require('../../../../../src/app/domain/models/AdjacencyList');

describe('Validation of the instance of a AdjacencyList object.', () => {
  it('Should be able to instance a valid AdjacencyList object with initial nodes.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2'],[[[1,1]],[[0,1]]]);

    expect(adjacencyListObj).toBeInstanceOf(AdjacencyList);
    expect(Object.keys(adjacencyListObj)).toHaveLength(2);
    expect(adjacencyListObj).toHaveProperty('Nodes', ['V1','V2']);
    expect(adjacencyListObj).toHaveProperty('Edges', [[[1,1]],[[0,1]]]);
  });
  it('Should be able to instance a valid AdjacencyList object without initial nodes.', () => {
    const adjacencyListObj = new AdjacencyList();

    expect(adjacencyListObj).toBeInstanceOf(AdjacencyList);
    expect(Object.keys(adjacencyListObj)).toHaveLength(2);
    expect(adjacencyListObj).toHaveProperty('Nodes', []);
    expect(adjacencyListObj).toHaveProperty('Edges', []);
  });
  it('Should be able to instance a valid AdjacencyList object without initial edges.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);

    expect(adjacencyListObj).toBeInstanceOf(AdjacencyList);
    expect(Object.keys(adjacencyListObj)).toHaveLength(2);
    expect(adjacencyListObj).toHaveProperty('Nodes', ['V1','V2']);
    expect(adjacencyListObj).toHaveProperty('Edges', []);
  });
});

describe('Validation of obtaining the size of nodes in the adjacency list.', () => {
  it('Should be able to get the number of Nodes in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const numberNodes = adjacencyListObj.GetNodesQuantity();

    expect(numberNodes).toBe(2);
  });
});

describe('Validation of obtaining the size of edges in the adjacency list.', () => {
  it('Should be able to get the number of edges in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2'],[[[1,1]],[[0,1]]]);
    const numberEdges = adjacencyListObj.GetEdgesQuantity();

    expect(numberEdges).toBe(1);
  });
});

describe('Validation of getting a node by index in the adjacency list.', () => {
  it('Should be able to get a node by a known index in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const node = adjacencyListObj.getNodeByIndex(0);

    expect(node).toBe('V1');
  });
  it('Should not be able to get a node by an unknown index in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const node = adjacencyListObj.getNodeByIndex(3);

    expect(node).toBeUndefined();
  });
});

describe('Validation of search a index by Node value in the adjacency list.', () => {
  it('Should be able to get the index of a known Node in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const indexNode = adjacencyListObj.getNodeIndex('V2');

    expect(indexNode).toBe(1);
  });
  it('Should not be able to get the index of a unknown Node in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const indexNode = adjacencyListObj.getNodeIndex('V0');

    expect(indexNode).toBe(-1);
  });
});

