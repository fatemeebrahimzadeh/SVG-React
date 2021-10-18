import React from "react";

const LineElement = (props) => {
    return (
        <svg width="100%" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg" id="RectPanel">
            <line className="element line" id={props.randomFunction()} x1={props.x1} x2={props.x2} y1={props.y1} y2={props.y2} stroke="black" />
        </svg>
    );
};

export default LineElement;
