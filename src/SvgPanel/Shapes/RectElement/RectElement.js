import React from "react";

const RectElement = (props) => {
    return (
        <svg width="100%" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg" id="RectPanel">
            <rect className="element rect" id={props.randomFunction()} x={props.x} y={props.y} rx="15" ry="15" width={props.width} height={props.height} />
        </svg>
    );
};

export default RectElement;

// NorthWestCorner:
