type Point = { x: number; y: number };

function isPointInPolygon(point: Point, polygon: Point[]): boolean {
    let isInside = false;

    // Loop through each edge of the polygon
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        
        const polygonI = polygon[i] ;
        const polygonJ = polygon[j] ;

        if (polygonI === undefined || polygonJ === undefined) {
            throw new Error("Polygon is undefined");
        }
        
        const xi = polygonI.x, yi = polygonI.y;
        const xj = polygonJ.x, yj = polygonJ.y;

        // Check if the point is within the edge's y-coordinates
        const intersects = (yi > point.y) !== (yj > point.y) &&
            point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

        if (intersects) {
            isInside = !isInside;
        }
    }

    return isInside;
}

export default isPointInPolygon;