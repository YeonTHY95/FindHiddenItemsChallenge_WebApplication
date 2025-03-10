import React from 'react';
import { it, expect, describe, beforeAll, vi } from 'vitest'
import ChallengeImageModule from '../src/ChallengeImageModule'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'

import {within} from '@testing-library/dom'

import Welcome from '../src/Welcome'
import { BrowserRouter as Router } from 'react-router-dom'

const simulateMouseEventCoordinate = ( x : number, y : number, targetImage : HTMLElement ) => {
  const mockEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
  });

  // Manually define `offsetX` and `offsetY`
  Object.defineProperty(mockEvent, "offsetX", { value: x });
  Object.defineProperty(mockEvent, "offsetY", { value: y });

  targetImage.dispatchEvent(mockEvent);

}

describe('ChallengeImageModule', () => {

    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn(function () {
	        this.open = true;
        });
        HTMLDialogElement.prototype.showModal = vi.fn(function () {
	        this.open = true;
        });
        HTMLDialogElement.prototype.close = vi.fn(function () {
	        this.open = false;
        });

        // window.addEventListener('submit', (e) => {
        //   e.preventDefault();
        // });
      });
      
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
                "x": 335,
                "y": 150
              },
              {
                "x": 310,
                "y": 150
              },
              
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

    it.skip('Test Welcome', () => {
        render(<Welcome />, {wrapper: Router});
        const welcomeText = screen.getByText('Welcome to the Page !!!');
        expect(welcomeText).toBeInTheDocument();
    });

    it.skip('Test the image button of ChallengeImageModule', () => {
        
        render(<ChallengeImageModule  imageInfo= {imageInfoItem} />);
        const userE = userEvent.setup();
        const clickImage = screen.getByAltText(imageInfoItem.imageName);
        expect(clickImage).toBeInTheDocument();
    });

    it('Test the image button after click', async () => {
        
        render(<ChallengeImageModule  imageInfo= {imageInfoItem} />);
        const userE = userEvent.setup();

        const startChallengeDiaglogTitle = screen.getByText(/Start the Challenge/i);
        expect(startChallengeDiaglogTitle).toBeInTheDocument();

        // Click the Start Challenge Button
        const startChallengeDiaglog = screen.getByTestId('startChallengeDiaglog');
        expect(startChallengeDiaglog).toBeInTheDocument();
        const startButton =  within(startChallengeDiaglog).getByRole('button', {name: 'Start'});
        expect(startButton).toBeInTheDocument();
        await userE.click(startButton);

        // vi.spyOn(window.HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
        //   width: 100,
        //   left: 0,
        //   right: 100,
        //   height: 50,
        //   top: 0,
        //   bottom: 50,
        //   x : 5,
        //   y : 5,
        //   toJSON : () => {}
        // }));

        // Click the ChallengeImage
        const image = screen.getByAltText(imageInfoItem.imageName);
        await userE.click(image);
        //await userE.pointer({keys: '[MouseLeft]', target : image, coords: {x: 85, y: 85}});
        
        // SelectDiaglo should pop out
        // Get the Select Element (ComboBox or ListBox)
        const selectDialog= screen.getByTestId('selectdialog');
        expect(selectDialog).toBeInTheDocument();
        const SelectElement = within(selectDialog).getByRole('combobox');
        // expect(option).toBeInTheDocument();

        // To Select item to find
        await userE.selectOptions(SelectElement,'shoe');
        const selectButton = screen.getByRole('button', {name : "Select"});

        // Implement Mocking e.preventDefault()
        const mockPreventDefault = vi.fn( (e) => e.preventDefault());
        window.addEventListener('submit', mockPreventDefault);
        await userE.click(selectButton);
        
        // After selected, the page should show which item to find
        const selectTitle = await screen.findByRole('heading', { name : /^Find\s\w*\snow/i });
        expect(selectTitle).toBeInTheDocument();
        const exactSelectTitle = await screen.findByRole('heading', { name : /^Find shoe now/i });
        expect(exactSelectTitle).toBeInTheDocument();

        //simulateMouseEventCoordinate(5,5 , image);
        const dialog = screen.getByText(/^Select \w* \w* \w* find$/i); //^Select\s\w*\s\w*\s\w*\sfind$
        expect(dialog).toBeInTheDocument();
        const targetBox = screen.getByTestId('testtargetbox');
        expect(targetBox).toHaveStyle('display: block');

        const selectDialogTitle = await screen.findByText(/Select the Object to Find/i);
        expect(selectDialogTitle).toBeInTheDocument();   
        
        await React.act( async () => {
          
          simulateMouseEventCoordinate(320,139,image);

        });
        
        const selectButton2 = screen.getByRole('button', {name : "Select"});
        expect(selectButton2).toBeInTheDocument();

        //Shoe is located at x is 322, y is 129
        //x is 330, y is 133
        //Selected tick position is (304px,138px) 2nd Location : 334, 133
        //"x": 310,"y": 123
        //"x": 334,"y": 133
        //"x": 310,"y": 150
        //"x": 335,"y": 150
    });

    
})