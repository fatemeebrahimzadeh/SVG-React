import React, { Component } from "react";
import svgStyle from "./svg.module.css";
import RectElement from "./Shapes/RectElement/RectElement";
import CircleElement from "./Shapes/CircleElement/CircleElement";
import EllipseElement from "./Shapes/EllipseElement/EllipseElement";
import LineElemenet from "./Shapes/LineElement/LineElement";
import PolylineElement from "./Shapes/PolylineElement/PolylineElement";

class SvgPanel extends Component {
    state = {
        SHAPES: [
            { name: "rect", x: "250", y: "200", width: "100", height: "100" },
            { name: "circle", cy: "250", cx: "750", r: "50" },
            { name: "ellipse", cx: "1250", cy: "250", rx: "60", ry: "40" },
            { name: "line", x1: "50", x2: "700", y1: "500", y2: "500" },
            { name: "polyline", points: "1100, 500  1140, 600 1240, 550" },
        ],
    };

    randomFunction = () => {
        let randomNumber = Math.floor(Math.random() * 100 + 1);
        return randomNumber;
    };

    render() {
        const shapes = [];
        this.state.SHAPES.forEach((shape, id) => {
            switch (shape.name) {
                case "rect":
                    shapes.push(<RectElement key={id} randomFunction={this.randomFunction} x={shape.x} y={shape.y} width={shape.width} height={shape.height} />);
                    break;
                case "circle":
                    shapes.push(<CircleElement key={id} randomFunction={this.randomFunction} cy={shape.cy} cx={shape.cx} r={shape.r} />);
                    break;
                case "ellipse":
                    shapes.push(<EllipseElement key={id} randomFunction={this.randomFunction} cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} />);
                    break;
                case "line":
                    shapes.push(<LineElemenet key={id} randomFunction={this.randomFunction} x1={shape.x1} x2={shape.x2} y1={shape.y1} y2={shape.y2} />);
                    break;
                case "polyline":
                    shapes.push(<PolylineElement key={id} randomFunction={this.randomFunction} points={shape.points} />);
                    break;
                default:
                    break;
            }
        });
        return (
            <svg
                onMouseDown={this.props.onMouseDownSelectionHandler}
                onMouseUp={this.props.onMouseUpSelectionHandler}
                onMouseMove={this.props.onMouseMoveSelectionHandler}
                className={svgStyle.svgPanel}
                width="100%"
                height="800"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                id="svgPanel"
            >
                {shapes}
                {this.props.selectionPolygon}
            </svg>
        );
    }
}

export default SvgPanel;
