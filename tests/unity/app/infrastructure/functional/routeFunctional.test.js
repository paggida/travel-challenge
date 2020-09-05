const routeFunctional = require('../../../../../src/app/infrastructure/functional/routeFunctional');

describe('Validation of the convertion of route string to array.', () => {
  it('Should be able to convert a route string to array.', () => {
    const routeStringArray = routeFunctional.getConvertRouteStringToArray('ABC-CBA');

    expect(routeStringArray).toHaveLength(2);
    expect(routeStringArray[0]).toBe('ABC');
    expect(routeStringArray[1]).toBe('CBA');
  });
  it('Should be able to convert a single string to array.', () => {
    const stringArray = routeFunctional.getConvertRouteStringToArray('ABC');

    expect(stringArray).toHaveLength(1);
    expect(stringArray[0]).toBe('ABC');
  });
});

describe('Validation of the convertion of routes array to adjacency list.', () => {
  it('Should be able to convert a routes array to adjacency list.', () => {
    const routesArray = [
      [ 'V1', 'V2', '4' ],
      [ 'V2', 'V3', '2' ],
      [ 'V3', 'V1', '3' ],
      [ 'V1', 'V2', '1' ]
    ]

    const routesAdjacencyList = routeFunctional.getConvertRoutesArrayToAdjacencyList(routesArray);
    const nodesQuantity = routesAdjacencyList.GetNodesQuantity();
    const edgesQuantity = routesAdjacencyList.GetEdgesQuantity();
    const nodesV1Index = routesAdjacencyList.getNodeIndex('V1');
    const nodesV2Index = routesAdjacencyList.getNodeIndex('V2');
    const nodesV3Index = routesAdjacencyList.getNodeIndex('V3');

    expect(nodesQuantity).toBe(3);
    expect(edgesQuantity).toBe(3);

    expect(nodesV1Index).toBeGreaterThanOrEqual(0);
    expect(routesAdjacencyList.Nodes[nodesV1Index]).toBe('V1');
    expect(routesAdjacencyList.Edges[nodesV1Index]).toHaveLength(2);
    expect(routesAdjacencyList.Edges[nodesV1Index][0][0]).toBe(nodesV2Index);
    expect(routesAdjacencyList.Edges[nodesV1Index][0][1]).toBe(1);
    expect(routesAdjacencyList.Edges[nodesV1Index][1][0]).toBe(nodesV3Index);
    expect(routesAdjacencyList.Edges[nodesV1Index][1][1]).toBe(3);

    expect(nodesV2Index).toBeGreaterThanOrEqual(0);
    expect(routesAdjacencyList.Nodes[nodesV2Index]).toBe('V2');
    expect(routesAdjacencyList.Edges[nodesV2Index]).toHaveLength(2);
    expect(routesAdjacencyList.Edges[nodesV2Index][0][0]).toBe(nodesV1Index);
    expect(routesAdjacencyList.Edges[nodesV2Index][0][1]).toBe(1);
    expect(routesAdjacencyList.Edges[nodesV2Index][1][0]).toBe(nodesV3Index);
    expect(routesAdjacencyList.Edges[nodesV2Index][1][1]).toBe(2);

    expect(nodesV3Index).toBeGreaterThanOrEqual(0);
    expect(routesAdjacencyList.Nodes[nodesV3Index]).toBe('V3');
    expect(routesAdjacencyList.Edges[nodesV3Index]).toHaveLength(2);
    expect(routesAdjacencyList.Edges[nodesV3Index][0][0]).toBe(nodesV2Index);
    expect(routesAdjacencyList.Edges[nodesV3Index][0][1]).toBe(2);
    expect(routesAdjacencyList.Edges[nodesV3Index][1][0]).toBe(nodesV1Index);
    expect(routesAdjacencyList.Edges[nodesV3Index][1][1]).toBe(3);
  });
});
