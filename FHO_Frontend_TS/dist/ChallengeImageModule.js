var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useRef, useState, useEffect } from 'react';
import isInPolygon from './isInPoly';
import isPointInPolygon from './IsPointInPolygon';
import axios from 'axios';
import * as React from 'react';
export default function ChallengeImageModule({ imageInfo }) {
    const dialogRef = useRef(null);
    const selectedItem = useRef(null);
    const [isSelectedItem, setIsSelectedItem] = useState(false);
    const targetBox = useRef(null);
    const tickWrapper = useRef(null);
    const startChallengeDiaglogRef = useRef(null);
    const completedDialogRef = useRef(null);
    const startTime = useRef(null);
    const [completeTime, setCompleteTime] = useState(null);
    useEffect(() => {
        // Set up Challenge Dialog
        if (startChallengeDiaglogRef.current === null) {
            throw new Error('startChallengeDiaglogRef.current is null');
        }
        startChallengeDiaglogRef.current.showModal();
    }, []);
    //console.log(`imageInfo is ${JSON.stringify(imageInfo)}`);
    //console.log( imageInfo.HiddenObjectPixelLocation);
    /* ////////////////////////////////////////////
        
            Select Dialog
        
    */ ////////////////////////////////////////////
    const startChallengeOnClick = () => __awaiter(this, void 0, void 0, function* () {
        console.log("The Challenge Timer starts !!");
        // Send the request for timer
        try {
            const timer = yield axios.get('/api/startTimer');
            console.log(`Timer from server is ${timer.data.startTime}`);
            startTime.current = timer.data.startTime;
        }
        catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            else {
                console.log(`Error is ${e}`);
            }
        }
        //Close Modal
        if (startChallengeDiaglogRef.current === null) {
            throw new Error('startChallengeDiaglogRef.current is null');
        }
        startChallengeDiaglogRef.current.close();
    });
    const getEndTime = () => __awaiter(this, void 0, void 0, function* () {
        const responseEndTime = yield axios.get('/api/endTimer');
        const endTime = responseEndTime.data.endTime;
        console.log(`Start Timer from server is ${startTime.current}`);
        console.log(`End Timer from server is ${endTime}`);
        console.log(`End Timer from server is ${typeof endTime}`);
        if (startTime.current === null) {
            throw new Error('startTime.current is null');
        }
        const differenceTime = (endTime - startTime.current) / 1000;
        console.log(`Difference time is ${differenceTime}`);
        setCompleteTime(differenceTime);
    });
    const closeCompletedDialog = () => {
        if (completedDialogRef.current === null) {
            throw new Error('completedDialogRef.current is null');
        }
        completedDialogRef.current.close();
    };
    /* ////////////////////////////////////////////
        
            Select Dialog
        
    */ ////////////////////////////////////////////
    const diaglogOnClick = (e) => {
        //console.log(e);
        const dialogX = e.clientX;
        const dialogY = e.clientY;
        ///// Close modal if click away
        if (dialogRef.current === null) {
            throw new Error('dialogRef.current is null');
        }
        const dialogBox = dialogRef.current.getBoundingClientRect();
        console.log(`dialogBox is ${JSON.stringify(dialogBox)}`);
        if (dialogX < dialogBox.left || dialogX > dialogBox.right || dialogY < dialogBox.top || dialogY > dialogBox.bottom) {
            console.log(`Inside diaglogClick user clicks away`);
            dialogRef.current.close('');
            setIsSelectedItem(false);
        }
    };
    const dialogButtonOnClick = (e) => {
        //e.preventDefault();
        //e.stopPropagation();
        if (selectedItem.current === null) {
            throw new Error('selectedItem.current is null');
        }
        console.log(`Inside dialogButtonClick, selectedItem value is ${selectedItem.current.value}`);
        if (!selectedItem.current.value) {
            console.log("No item is selected !!!");
            return; //dialogRef.current.showModal();
        }
        if (dialogRef.current === null) {
            throw new Error('dialogRef.current is null');
        }
        dialogRef.current.close(selectedItem.current.value);
        setIsSelectedItem(true);
    };
    /* ////////////////////////////////////////////
        
            Guessing Period
        
    */ ////////////////////////////////////////////
    const imageOnClick = (e) => {
        //console.log(`e is ${Object.keys(e)}`);
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        console.log(`x is ${x}, y is ${y}`);
        console.log("CB X Y");
        //console.log(`imageInfo.HiddenObjectPixelLocation type is ${JSON.stringify(imageInfo.HiddenObjectPixelLocation)}`);
        if (selectedItem.current == null) {
            throw new Error("selecteditem is null");
        }
        console.log(`selectedItem is ${selectedItem.current.value}`);
        if (targetBox.current === null) {
            throw new Error('targetBox.current is null');
        }
        targetBox.current.style.display = 'block';
        const targetBoxX = x - 5;
        const targetBoxY = y - 5;
        targetBox.current.style.left = (targetBoxX + "px");
        targetBox.current.style.top = (targetBoxY + "px");
        if (dialogRef.current === null) {
            throw new Error('dialogRef.current is null');
        }
        if (selectedItem.current === null) {
            throw new Error('selectedItem.current is null');
        }
        if (!isSelectedItem) { //Item not selected
            console.log(`Inside Modal `);
            dialogRef.current.showModal();
            console.log(`After Modal `);
        }
        else {
            const polygon = imageInfo.HiddenObjectPixelLocation[selectedItem.current.value];
            let polygonCoordinate = [];
            let polygonCoordinate2 = [];
            if (polygon === undefined) {
                throw new Error('polygon is undefined');
            }
            console.log(polygon);
            polygon.map(p => {
                polygonCoordinate.push([p.x, p.y]);
                polygonCoordinate2.push({ x: p.x, y: p.y });
            });
            //console.log(`Item is selected, selectedItem is ${selectedItem.current.value}`);
            //console.log(`imageInfo of ${selectedItem.current} is ` + `${polygon}`);
            const clickPoint = [x, y];
            const clickPoint2 = { x, y };
            const isIn = isInPolygon(polygonCoordinate, clickPoint);
            const isIn2 = isPointInPolygon(clickPoint2, polygonCoordinate2);
            console.log(`isIn2 is ${isIn2}`);
            console.log(polygonCoordinate2);
            if (isIn2) { // Item is pinpointed correctly
                console.log("Guess correctly !!!");
                //Place the Correct Marker on the object
                if (tickWrapper.current === null) {
                    throw new Error('tickWrapper.current is null');
                }
                tickWrapper.current.childNodes.forEach(tick => {
                    const tickWrapperChild = tick;
                    console.log(`tick id is ${tickWrapperChild.id}`);
                    if (selectedItem.current === null) {
                        throw new Error('selectedItem.current is null');
                    }
                    if (tickWrapperChild.id === selectedItem.current.value + 'Tick') {
                        console.log(`Selected tick position is (${tickWrapperChild.style.left},${tickWrapperChild.style.top})`);
                        tickWrapperChild.style.display = 'block';
                    }
                });
                // Add disable to correctly identified object
                selectedItem.current.childNodes.forEach(option => {
                    if (selectedItem.current === null) {
                        throw new Error('selectedItem.current is null');
                    }
                    const selectedItemChildOption = option;
                    if (selectedItemChildOption.value === selectedItem.current.value) {
                        selectedItemChildOption.disabled = true;
                        console.log("Add Disable");
                        selectedItem.current.value = '';
                        setIsSelectedItem(false);
                    }
                });
                //Check if all items are guessed correctly
                let allAreDisabled = true;
                selectedItem.current.childNodes.forEach(option => {
                    const selectedItemChildOption = option;
                    if (selectedItemChildOption.disabled === false) {
                        allAreDisabled = false;
                    }
                });
                // If all items are cleared, then display Complete Dialog Message
                if (allAreDisabled) {
                    getEndTime();
                    console.log("About to open completedDialog");
                    setTimeout(() => {
                        if (completedDialogRef.current === null) {
                            throw new Error('completedDialogRef.current is null');
                        }
                        completedDialogRef.current.showModal();
                    }, 100);
                }
                else {
                    dialogRef.current.showModal();
                }
            }
            else {
                console.log("Wrong, find it again");
            }
        }
        console.log(`Outside Modal`);
        console.log(`dialog returnValue is ${dialogRef.current.returnValue}`);
        setTimeout(() => {
            if (targetBox.current === null) {
                throw new Error('targetBox.current is null');
            }
            targetBox.current.style.display = 'none';
        }, 1000);
    };
    return (React.createElement(React.Fragment, null,
        isSelectedItem &&
            (React.createElement("div", null,
                React.createElement("h2", null,
                    "Find ",
                    React.createElement("span", { className: 'selectedItem' }, selectedItem.current && selectedItem.current.value),
                    " now !!!"),
                React.createElement("button", { onClick: () => { selectedItem.current && (selectedItem.current.value = ""); setIsSelectedItem(false); targetBox.current && (targetBox.current.style.display = 'none'); } }, "Select other Object"))),
        React.createElement("div", { className: 'imageWrapper' },
            React.createElement("img", { src: imageInfo.imageURL, alt: imageInfo.imageName, onMouseDown: (e) => imageOnClick(e) }),
            React.createElement("div", { ref: targetBox, className: 'targetbox', "data-testid": 'testtargetbox' }),
            React.createElement("div", { ref: tickWrapper }, imageInfo.HiddenObjectPixelLocation && (Object.entries(imageInfo.HiddenObjectPixelLocation).map(object => {
                // object[0] is current item
                // object[1] is the array of 4 locations
                const currentObject = object[1][1]; // This gets the second location of current item
                if (object === undefined && object[1] === undefined && currentObject === undefined) {
                    throw new Error('object is undefined');
                }
                return (React.createElement("div", { key: object[0], id: object[0] + "Tick", style: { left: (currentObject && currentObject.x - 30), top: (currentObject && currentObject.y + 5), display: 'None', position: 'absolute' } },
                    React.createElement("img", { src: '/tick.svg', className: 'tick' })));
            })))),
        React.createElement("dialog", { ref: dialogRef, onMouseDown: diaglogOnClick, "data-testid": 'selectdialog' },
            React.createElement("form", null,
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Select the Object to Find"),
                    React.createElement("select", { ref: selectedItem }, imageInfo.HiddenObjectPixelLocation && (Object.entries(imageInfo.HiddenObjectPixelLocation).map(object => {
                        return React.createElement("option", { key: object[0] }, object[0]);
                    }))),
                    React.createElement("button", { formMethod: 'dialog', value: 'DialogButton', onClick: dialogButtonOnClick }, "Select")))),
        React.createElement("dialog", { ref: startChallengeDiaglogRef, "data-testid": 'startChallengeDiaglog' },
            React.createElement("h1", null, "Start the Challenge !!!"),
            React.createElement("button", { formMethod: 'dialog', onClick: startChallengeOnClick }, "Start")),
        completeTime && (React.createElement("dialog", { ref: completedDialogRef },
            React.createElement("h1", null, "Congratulations for Completing the Challenge !!!"),
            React.createElement("h2", null,
                "You completed it in ",
                completeTime,
                " seconds !!!"),
            React.createElement("button", { onClick: closeCompletedDialog }, "Close")))));
}
