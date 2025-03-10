import React from 'react';
import { ImageInfo } from './ImageSliderComponent';

export default function TestOption({imageInfo} : {imageInfo:ImageInfo}) : React.JSX.Element {

    const selectedItem = React.useRef<HTMLSelectElement>(null);
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    const dialogButtonOnClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        console.log("diaglogButtonOnClick called");
    };

    const diaglogOnClick = (e:React.MouseEvent<HTMLDialogElement>) => {
        console.log("diaglogButtonOnClick called");
    };

    return (<>
    {/* <dialog ref = {dialogRef} onMouseDown={diaglogOnClick} data-testid='selectdialog'> */}
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
    {/* </dialog> */}
    </>);
}