const pointInPolygon = function (polygon, point) {
    //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        //If a line from the point into infinity crosses this edge
        let pointX = point[0];
        let pointY = point[1];
        let currentEdge = polygon[i];
        let lastEdge = polygon[j];
        if (currentEdge === undefined && lastEdge === undefined) {
            throw new Error('polygon is undefined');
        }
        let currentEdgeX = currentEdge === undefined ? undefined : currentEdge[0];
        let currentEdgeY = currentEdge === undefined ? undefined : currentEdge[1];
        let lastEdgeX = lastEdge === undefined ? undefined : lastEdge[0];
        let lastEdgeY = lastEdge === undefined ? undefined : lastEdge[1];
        if (pointX === undefined || pointY === undefined) {
            throw new Error('Point is undefined');
        }
        if (lastEdgeY === undefined || currentEdgeY === undefined || currentEdgeX === undefined || lastEdgeX === undefined) {
            throw new Error('lastEdgeY or currentEdgeY is undefined');
        }
        if (((currentEdgeY > pointY) !== (lastEdgeY > pointY)) // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
            && (pointX < ((lastEdgeX - currentEdgeX) * (pointY - currentEdgeY) / (lastEdgeY - currentEdgeY) + currentEdgeX))) {
            // Invert odd
            odd = !odd;
        }
        j = i;
    }
    //If the number of crossings was odd, the point is in the polygon
    return odd;
};
export default pointInPolygon;
