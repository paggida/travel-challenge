const Edge = require('../../../../../src/app/domain/models/Edge');

describe('Validation of the instance of a Edge object.', () => {
  it('Should be able to instance a valid Edge object with weight.', () => {
    const edgeObj = new Edge(0,10);

    expect(edgeObj).toBeInstanceOf(Edge);
    expect(Object.keys(edgeObj)).toHaveLength(2);
    expect(edgeObj).toHaveProperty('TargetNodeIndex', 0);
    expect(edgeObj).toHaveProperty('Weight', 10);
  });
  it('Should be able to instance a valid Edge object without weight.', () => {
    const edgeObj = new Edge(0);

    expect(edgeObj).toBeInstanceOf(Edge);
    expect(Object.keys(edgeObj)).toHaveLength(2);
    expect(edgeObj).toHaveProperty('TargetNodeIndex', 0);
    expect(edgeObj).toHaveProperty('Weight', 0);
  });
});

