import React from "react";

const EllipseElement = (props) => {
    return (
        <svg width="100%" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg" id="RectPanel">
            <ellipse className="element ellipse " id={props.randomFunction()} cy={props.cy} cx={props.cx} rx={props.rx} ry={props.ry} />
        </svg>
    );
};

export default EllipseElement;
