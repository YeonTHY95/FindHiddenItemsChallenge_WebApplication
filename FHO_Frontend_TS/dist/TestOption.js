import React from 'react';
export default function TestOption({ imageInfo }) {
    const selectedItem = React.useRef(null);
    const dialogRef = React.useRef(null);
    const dialogButtonOnClick = (e) => {
        console.log("diaglogButtonOnClick called");
    };
    const diaglogOnClick = (e) => {
        console.log("diaglogButtonOnClick called");
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", null,
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Select the Object to Find"),
                React.createElement("select", { ref: selectedItem }, imageInfo.HiddenObjectPixelLocation && (Object.entries(imageInfo.HiddenObjectPixelLocation).map(object => {
                    return React.createElement("option", { key: object[0] }, object[0]);
                }))),
                React.createElement("button", { formMethod: 'dialog', value: 'DialogButton', onClick: dialogButtonOnClick }, "Select")))));
}
