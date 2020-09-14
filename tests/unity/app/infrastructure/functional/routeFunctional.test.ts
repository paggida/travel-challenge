import AdjacencyList from '../../../../../src/app/domain/models/AdjacencyList';
import { getConvertRouteStringToArray, getConvertRoutesArrayToAdjacencyList, getCheapestRoute } from '../../../../../src/app/infrastructure/functional/routeFunctional';

describe('Validation of the convertion of route string to array.', () => {
  it('Should be able to convert a route string to array.', () => {
    const routeStringArray = getConvertRouteStringToArray('ABC-CBA');

    expect(routeStringArray).toHaveLength(2);
    expect(routeStringArray[0]).toBe('ABC');
    expect(routeStringArray[1]).toBe('CBA');
  });
  it('Should be able to convert a single string to array.', () => {
    const stringArray = getConvertRouteStringToArray('ABC');

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

    const routesAdjacencyList = getConvertRoutesArrayToAdjacencyList(routesArray);
    const nodesQuantity = routesAdjacencyList.GetNodesQuantity();
    const edgesQuantity = routesAdjacencyList.GetEdgesQuantity();
    const nodesV1Index = routesAdjacencyList.GetNodeIndex('V1');
    const nodesV2Index = routesAdjacencyList.GetNodeIndex('V2');
    const nodesV3Index = routesAdjacencyList.GetNodeIndex('V3');

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

describe('Validation of the search for the cheapest route between two destinations.', () => {
  it('Should be able to get the Route object with the cheapest route.', async () => {
    const nodeValueArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
    const edgesObjArray = [
      [[1,4],[2,3],[4,7]],
      [[0,4],[2,6],[3,5]],
      [[0,3],[1,6],[3,11],[4,8]],
      [[1,5],[2,11],[4,2],[6,10],[5,2]],
      [[0,7],[2,8],[3,2],[6,5]],
      [[3,2],[6,3]],
      [[4,5],[3,10],[5,3]]
    ];

    const originDestination = 'A';
    const targetDestination = 'F';
    const adjacencyListObj = new AdjacencyList(nodeValueArray, edgesObjArray);
    const cheapestRoute = getCheapestRoute(originDestination,targetDestination,adjacencyListObj);
    const bestRouteString = cheapestRoute.GetBestRouteString();

    expect(cheapestRoute).toHaveProperty('Destinations');
    expect(cheapestRoute).toHaveProperty('Price');
    expect(cheapestRoute.Destinations).toHaveLength(4);
    expect(cheapestRoute.Destinations[0]).toBe(originDestination);
    expect(cheapestRoute.Destinations[1]).toBe('B');
    expect(cheapestRoute.Destinations[2]).toBe('D');
    expect(cheapestRoute.Destinations[3]).toBe(targetDestination);
    expect(cheapestRoute.Price).toBe(11);
    expect(bestRouteString).toBe('A - B - D - F > $11');
  })
})
