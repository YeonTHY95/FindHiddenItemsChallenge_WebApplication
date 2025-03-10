import isPointInPolygon from "../src/IsPointInPolygon";

import { describe, it, expect } from 'vitest'

describe("The ispointinPoly Algorithm", () => {

    const shoeLocation = [
      {
        "x": 310, "y": 123
      },
      {
        "x": 334, "y": 133
      },
      {
        "x": 335, "y": 150
      },
      {
        "x": 310, "y": 150
      },
    ]

    const polygonExample = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
  ];
    it("Test with first array", ()=> {
        const clickPoint = { x:315,y:143 };
        
        const isInside = isPointInPolygon(clickPoint, shoeLocation);
        
        expect(isInside).toBeTruthy();
        //expect(isInside2).toBeTruthy();
    });
});