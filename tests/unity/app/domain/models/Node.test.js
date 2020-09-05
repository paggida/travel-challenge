const Node = require('../../../../../src/app/domain/models/Node');

describe('Validation of the instance of a Node object.', () => {
  it('Should be able to instance a valid Node object with value.', () => {
    const nodeObj = new Node('V1');

    expect(nodeObj).toBeInstanceOf(Node);
    expect(Object.keys(nodeObj)).toHaveLength(2);
    expect(nodeObj).toHaveProperty('Value', 'V1');
    expect(nodeObj).toHaveProperty('Edges', []);
  });
  it('Should be able to instance a valid Node object without value.', () => {
    const nodeObj = new Node();

    expect(nodeObj).toBeInstanceOf(Node);
    expect(Object.keys(nodeObj)).toHaveLength(2);
    expect(nodeObj).toHaveProperty('Value');
    expect(nodeObj.Value).toBeUndefined();
    expect(nodeObj).toHaveProperty('Edges', []);
  });
});

describe('Validation of add a new edge in the Node.', () => {
  it('Should be able to add a new edge in the Node.', () => {
    const nodeObj = new Node();
    const oldSizeEdges = nodeObj.GetEdgesQuantity();

    nodeObj.SetNewEdge('V1');

    const newSizeEdges = nodeObj.GetEdgesQuantity();
    const lastAddEdge = nodeObj.Edges[nodeObj.GetEdgesQuantity() - 1];

    expect(oldSizeEdges).toBe(newSizeEdges-1);
    expect(lastAddEdge).toBe('V1');
  });
});

describe('Validation of obtaining the size of edges in the Node.', () => {
  it('Should be able to get the number of edges in the Node.', () => {
    const nodeObj = new Node();

    nodeObj.SetNewEdge('V1');

    const sizeEdges = nodeObj.GetEdgesQuantity();
    const lastAddEdge = nodeObj.Edges[nodeObj.GetEdgesQuantity() - 1];

    expect(sizeEdges).toBe(1);
    expect(lastAddEdge).toBe('V1');
  });
});
