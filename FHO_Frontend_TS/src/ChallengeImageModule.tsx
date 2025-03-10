import { useRef, useState, useEffect} from 'react';
import isInPolygon from './isInPoly';
import isPointInPolygon from './IsPointInPolygon';
import axios from 'axios';

import { ImageInfo } from './ImageSliderComponent';
import * as React from 'react';



export default function ChallengeImageModule  ( {imageInfo} : {imageInfo:ImageInfo} )  {

    const dialogRef = useRef<HTMLDialogElement>(null);
    const selectedItem = useRef<HTMLSelectElement>(null);
    const [isSelectedItem, setIsSelectedItem] = useState(false);

    const targetBox = useRef<HTMLDivElement>(null);
    const tickWrapper = useRef<HTMLDivElement>(null);
    const startChallengeDiaglogRef = useRef<HTMLDialogElement>(null);
    const completedDialogRef = useRef<HTMLDialogElement>(null);

    const startTime = useRef<number | null>(null);
    const [completeTime, setCompleteTime] = useState<number | null>(null);

    let correctSoundEffectAudio = new Audio('/audio/correctSoundEffect.mp3');

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(()=> {

        // Set up Challenge Dialog
        if (startChallengeDiaglogRef.current === null) {
            throw new Error('startChallengeDiaglogRef.current is null');

        }
        startChallengeDiaglogRef.current.showModal();
    },[]);
               
    //console.log(`imageInfo is ${JSON.stringify(imageInfo)}`);
    //console.log( imageInfo.HiddenObjectPixelLocation);


    /* ////////////////////////////////////////////
        
            Select Dialog
        
    */ ////////////////////////////////////////////


    const startChallengeOnClick = async () => {
        console.log("The Challenge Timer starts !!");

        // Send the request for timer
        try{
            const timer = await axios.get('/api/startTimer');
            console.log(`Timer from server is ${timer.data.startTime}`);
            startTime.current = timer.data.startTime;
        }

        catch(e){
            if (e instanceof Error) {
                
            throw new Error(e.message);
            }
            else {
                console.log(`Error is ${e}`);
            }
        }
        
        //Close Modal
        if (startChallengeDiaglogRef.current === null ){
            throw new Error('startChallengeDiaglogRef.current is null');
        }
        startChallengeDiaglogRef.current.close();
    };


    const getEndTime = async () => {

        const responseEndTime = await axios.get('/api/endTimer');
        const endTime = responseEndTime.data.endTime;

        console.log(`Start Timer from server is ${startTime.current}`);
        console.log(`End Timer from server is ${endTime}`);
        console.log(`End Timer from server is ${typeof endTime}`);
        if (startTime.current === null) {
            throw new Error('startTime.current is null');
        }
        const differenceTime = (endTime - startTime.current)/1000;
        console.log(`Difference time is ${differenceTime}`);
        setCompleteTime( differenceTime);
    };


    const closeCompletedDialog = () => {
        if (completedDialogRef.current === null) {
            throw new Error('completedDialogRef.current is null');
        }
        completedDialogRef.current.close();

    }
    

    /* ////////////////////////////////////////////
        
            Select Dialog
        
    */ ////////////////////////////////////////////

    

    const diaglogOnClick = (e: React.MouseEvent<HTMLDialogElement>) => {

        //console.log(e);
        const dialogX = e.clientX;
        const dialogY = e.clientY;

        ///// Close modal if click away

        if (dialogRef.current === null) {
            throw new Error('dialogRef.current is null');
        }   

        const dialogBox = dialogRef.current.getBoundingClientRect();

        console.log(`dialogBox is ${JSON.stringify(dialogBox)}`);

        if ( dialogX < dialogBox.left || dialogX > dialogBox.right  ||  dialogY  < dialogBox.top || dialogY > dialogBox.bottom ) {

            console.log(`Inside diaglogClick user clicks away`);
            dialogRef.current.close('');
            setIsSelectedItem(false);
        }

    };

    const dialogButtonOnClick = (e:React.MouseEvent<HTMLButtonElement>) => {

        //e.preventDefault();
        //e.stopPropagation();

        if (selectedItem.current === null) {
            throw new Error('selectedItem.current is null');
        }
        console.log(`Inside dialogButtonClick, selectedItem value is ${selectedItem.current.value}`);
        
        if(!selectedItem.current.value){
            console.log("No item is selected !!!");
            return ;//dialogRef.current.showModal();
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

    const imageOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
        //console.log(`e is ${Object.keys(e)}`);
        const x = e.nativeEvent.offsetX ;
        const y = e.nativeEvent.offsetY ;

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

        const targetBoxX= x -5;
        const targetBoxY= y -5;
        
        targetBox.current.style.left = ( targetBoxX + "px");
        targetBox.current.style.top = ( targetBoxY + "px");
        
       if (dialogRef.current === null) {
            throw new Error('dialogRef.current is null');
        }

        if (selectedItem.current === null) {
            throw new Error('selectedItem.current is null');
        }

        if(!isSelectedItem) { //Item not selected
            console.log(`Inside Modal `);
            dialogRef.current.showModal();
            console.log(`After Modal `);
        }
        else { 
            const polygon = imageInfo.HiddenObjectPixelLocation[selectedItem.current.value];
            let polygonCoordinate:[number,number][]=[];
            let polygonCoordinate2:{x:number,y:number}[]=[];
            if (polygon === undefined) {
                throw new Error('polygon is undefined');
            }
            console.log(polygon);
            polygon.map( p => {
                polygonCoordinate.push([p.x ,p.y]);
                polygonCoordinate2.push({x: p.x, y:p.y})
            });
            //console.log(`Item is selected, selectedItem is ${selectedItem.current.value}`);
            //console.log(`imageInfo of ${selectedItem.current} is ` + `${polygon}`);

            const clickPoint = [x,y];
            const clickPoint2 = {x,y}
            const isIn = isInPolygon(polygonCoordinate,clickPoint);
            const isIn2 = isPointInPolygon(clickPoint2, polygonCoordinate2);
            console.log(`isIn2 is ${isIn2}`);
            console.log(polygonCoordinate2);
            if(isIn2) { // Item is pinpointed correctly
                console.log("Guess correctly !!!");

                correctSoundEffectAudio.play();

                console.log("CorrectSoundEffect cb");

                //Place the Correct Marker on the object
                if (tickWrapper.current === null ) {
                    throw new Error('tickWrapper.current is null');
                }   
                
                tickWrapper.current.childNodes.forEach( tick => {
                    
                    const tickWrapperChild = tick as HTMLDivElement;
                    console.log(`tick id is ${tickWrapperChild.id}`);
                    if (selectedItem.current === null) {
                        throw new Error('selectedItem.current is null');
                    }
                    if( tickWrapperChild.id === selectedItem.current.value + 'Tick'){
                        console.log(`Selected tick position is (${tickWrapperChild.style.left},${tickWrapperChild.style.top})`);
                        tickWrapperChild.style.display='block';
                    }

                });
                
                // Add disable to correctly identified object
                selectedItem.current.childNodes.forEach( option => {
                    if (selectedItem.current === null) {
                        throw new Error('selectedItem.current is null');
                    }
                    const selectedItemChildOption = option as HTMLOptionElement;
                    if ( selectedItemChildOption.value === selectedItem.current.value ) {
                        selectedItemChildOption.disabled = true;
                        console.log("Add Disable");
                        selectedItem.current.value ='';
                        setIsSelectedItem(false);
                    }
                        
                })  

                //Check if all items are guessed correctly
                let allAreDisabled = true;
                selectedItem.current.childNodes.forEach( option => {
                    const selectedItemChildOption = option as HTMLOptionElement;
                    if ( selectedItemChildOption.disabled === false ) {
                        allAreDisabled = false;                        
                    }
                        
                })  

                // If all items are cleared, then display Complete Dialog Message
                if(allAreDisabled){

                    getEndTime();
                    console.log("About to open completedDialog");

                    setIsCompleted(true);

                    setTimeout(()=> { 
                        if (completedDialogRef.current === null) {
                            throw new Error('completedDialogRef.current is null');
                        }
                        completedDialogRef.current.showModal();
                        } ,100);
                        
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

        

        setTimeout( ()=> {
            if (targetBox.current === null ){
                throw new Error('targetBox.current is null');
            }
            targetBox.current.style.display = 'none';
        }, 1000 );
        

    };

    

    return ( <>
        {   
            isSelectedItem ?
            ( <div><h2>Find <span className='selectedItem'>{selectedItem.current && selectedItem.current.value}</span> now !!!</h2><button onClick={()=>{  selectedItem.current && (selectedItem.current.value=""); setIsSelectedItem(false);  targetBox.current && (targetBox.current.style.display='none')}}>Select other Object</button></div> ) 
            : (isCompleted ? (<div><h2 style={{color:"red"}}>Congratulations 🎉🎉🎉</h2></div>): (<div><h2>Click the image to select item to identify.</h2></div>))
        }
        <div className='imageWrapper'>
            <img src={imageInfo.imageURL } alt ={ imageInfo.imageName} onMouseDown={ (e)=> imageOnClick(e)}/>
            <div ref={targetBox} className='targetbox' data-testid='testtargetbox'></div>
            <div ref={tickWrapper}>
            {
                imageInfo.HiddenObjectPixelLocation && (
                    Object.entries(imageInfo.HiddenObjectPixelLocation).map( object=>{
                        // object[0] is current item
                        // object[1] is the array of 4 locations
                        const currentObject = object[1][1]; // This gets the second location of current item
                        if (object === undefined && object[1] === undefined && currentObject === undefined) {
                            throw new Error('object is undefined');
                        }

                        return (
                            
                            <div key={object[0]} id={object[0]+"Tick"} style={{left:(currentObject && currentObject.x-30), top:(currentObject && currentObject.y+5), display:'None', position:'absolute'}}>
                                <img src='/tick.svg' className='tick' />
                            </div>
                        )
                        }
                            
                    )
                )
            }
            </div>
            
        </div>
        <dialog ref = {dialogRef} onMouseDown={diaglogOnClick} data-testid='selectdialog'>
            <form>
                <fieldset>
                    <legend>Select the Object to Find</legend>
                    <select ref={selectedItem}>
                        {   
                            imageInfo.HiddenObjectPixelLocation && (
                                Object.entries(imageInfo.HiddenObjectPixelLocation).map( object=>{

                                    return <option key={object[0]}>{object[0]}</option>
                                    }
                                        
                                )
                            )            
                        }
                    </select>
                    <button formMethod='dialog' value='DialogButton' onClick={dialogButtonOnClick}>Select</button>
                </fieldset>
            </form>
        </dialog>

        {/* 
                Start Challenge and Completed Diaglog

        */ }
        <dialog ref={startChallengeDiaglogRef} data-testid='startChallengeDiaglog'>
            <h1>Start the Challenge !!!</h1>
            <button formMethod='dialog' onClick={startChallengeOnClick}>Start</button>       
        </dialog>
        {
            completeTime && (
                <dialog ref={completedDialogRef}>
                    <h1>Congratulations for Completing the Challenge !!!</h1>
                    <h2>You completed it in {completeTime} seconds !!!</h2>
                    <button onClick={closeCompletedDialog}>Close</button>       
                </dialog>)
        } 
        
    </>);
}