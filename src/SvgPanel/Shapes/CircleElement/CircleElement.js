import React from "react";

const CircleElement = (props) => {
    return (
        <svg width="100%" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg" id="RectPanel">
            <circle className="element circle" id={props.randomFunction()} cy={props.cy} cx={props.cx} r={props.r} />
        </svg>
    );
};

export default CircleElement;
