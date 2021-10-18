import React from "react";

const PolylineElement = (props) => {
    return (
        <svg width="100%" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg" id="RectPanel">
            <polyline className="element polyline" id={props.randomFunction()} points={props.points} fill="none" stroke="black" />
        </svg>
    );
};

export default PolylineElement;
