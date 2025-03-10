import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import { describe, it, expect, beforeAll ,vi} from 'vitest';

import TestOption from '../src/TestOption';
import React from 'react';

describe('TestOption', () => {

    const imageInfoItem = {
        imageID : 1,
        imageName : 'Room',
        imageURL : '/Room.jpg',
        HiddenObjectPixelLocation : {
            "shoe": [
              {
                "x": 310,
                "y": 123
              },
              {
                "x": 334,
                "y": 133
              },
              {
                "x": 310,
                "y": 150
              },
              {
                "x": 335,
                "y": 150
              }
            ],
            "clock": [
              {
                "x": 370,
                "y": 190
              },
              {
                "x": 405,
                "y": 193
              },
              {
                "x": 372,
                "y": 211
              },
              {
                "x": 398,
                "y": 209
              }
            ],
            "bottle": [
              {
                "x": 66,
                "y": 91
              },
              {
                "x": 80,
                "y": 94
              },
              {
                "x": 65,
                "y": 137
              },
              {
                "x": 80,
                "y": 139
              }
            ],
            "shovel": [
              {
                "x": 46,
                "y": 197
              },
              {
                "x": 75,
                "y": 202
              },
              {
                "x": 31,
                "y": 247
              },
              {
                "x": 49,
                "y": 250
              }
            ],
            "lifebuoy": [
              {
                "x": 276,
                "y": 42
              },
              {
                "x": 335,
                "y": 49
              },
              {
                "x": 273,
                "y": 103
              },
              {
                "x": 321,
                "y": 103
              }
            ]
          }
    }

    const userE = userEvent.setup();
    // beforeAll(() => {
    //     HTMLDialogElement.prototype.show = vi.fn(function () {
	//         this.open = true;
    //     });
    //     HTMLDialogElement.prototype.showModal = vi.fn(function () {
	//         this.open = true;
    //     });
    //     HTMLDialogElement.prototype.close = vi.fn(function () {
	//         this.open = true;
    //     });
    //   });
    it('should render the TestOption component', async () => {
        render(<TestOption imageInfo={imageInfoItem} />);
        screen.debug();
        const selectElement = screen.getByRole('combobox');  
        expect(selectElement).toBeInTheDocument();
        //userE.click(testOption);
        await userE.selectOptions(selectElement, "shoe");
        const shoeOption = screen.getByRole('option', {name:'shoe'}) as HTMLOptionElement;
        await userE.selectOptions(selectElement, "bottle");
        const bottleOption = screen.getByRole('option', {name:'bottle'}) as HTMLOptionElement;
        //userE.click(shoeOption);
        expect(shoeOption.selected).toBeFalsy();
        expect(bottleOption.selected).toBeTruthy();
    });

    
});