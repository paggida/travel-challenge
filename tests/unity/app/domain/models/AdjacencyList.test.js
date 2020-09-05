const AdjacencyList = require('../../../../../src/app/domain/models/AdjacencyList');

describe('Validation of the instance of a AdjacencyList object.', () => {
  it('Should be able to instance a valid AdjacencyList object with initial nodes.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);

    expect(adjacencyListObj).toBeInstanceOf(AdjacencyList);
    expect(Object.keys(adjacencyListObj)).toHaveLength(1);
    expect(adjacencyListObj).toHaveProperty('Nodes', ['V1','V2']);
  });
  it('Should be able to instance a valid AdjacencyList object without initial nodes.', () => {
    const adjacencyListObj = new AdjacencyList();

    expect(adjacencyListObj).toBeInstanceOf(AdjacencyList);
    expect(Object.keys(adjacencyListObj)).toHaveLength(1);
    expect(adjacencyListObj).toHaveProperty('Nodes', []);
  });
});

describe('Validation of obtaining the size of names in the adjacency list.', () => {
  it('Should be able to get the number of Nodes in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const numberNodes = adjacencyListObj.GetNodesQuantity();

    expect(numberNodes).toBe(2);
  });
});

describe('Validation of search a index in the adjacency list.', () => {
  it('Should be able to validate a known index in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const isKnownNode = adjacencyListObj.IsKnownNode(0);

    expect(isKnownNode).toBeTruthy();
  });
  it('Should not be able to validate an unknown index in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const isKnownNode = adjacencyListObj.IsKnownNode(3);

    expect(isKnownNode).toBeFalsy();
  });
});

describe('Validation of add a new node in the adjacency list.', () => {
  it('Should be able to add a single new node in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1','V2']);
    const oldSizeList = adjacencyListObj.GetNodesQuantity();

    adjacencyListObj.SetNewNode('V3');

    const newSizeList = adjacencyListObj.GetNodesQuantity();
    const lastAddNode = adjacencyListObj.Nodes[adjacencyListObj.GetNodesQuantity() - 1];

    expect(oldSizeList).toBe(newSizeList-1);
    expect(lastAddNode).toBe('V3');
  });
  it('Should be able to add a block of new nodes in the list.', () => {
    const adjacencyListObj = new AdjacencyList(['V1']);
    const oldSizeList = adjacencyListObj.GetNodesQuantity();

    adjacencyListObj.SetNewNodesInBlock(['V2','V3']);

    const newSizeList = adjacencyListObj.GetNodesQuantity();
    const penultimateAddNode = adjacencyListObj.Nodes[adjacencyListObj.GetNodesQuantity() - 2];
    const lastAddNode = adjacencyListObj.Nodes[adjacencyListObj.GetNodesQuantity() - 1];

    expect(oldSizeList).toBe(newSizeList-2);
    expect(penultimateAddNode).toBe('V2');
    expect(lastAddNode).toBe('V3');
  });
});
