import React, { Component } from "react";
import AppStyle from "./App.module.css";
import SvgPanel from "./SvgPanel/SvgPanel";
import ActionBar from "./ActionBar/ActionBar";

class App extends Component {
    state = {
        mouseDownFlag: false,
        selectionPolygon: null,
        polylinepointArray: [],
        mouseUpFlag: false,
    };

    componentDidMount() {
        let ShapesInfo = [];
        for (let item of Array.from(document.getElementsByClassName("element"))) {
            ShapesInfo.push({
                name: item.getAttribute("class").split(" ")[1],
                element: item,
                info: item.getBBox(),
                width: item.getBBox().width,
                height: item.getBBox().height,
                centerX: item.getBBox().x + item.getBBox().width / 2,
                centerY: item.getBBox().y + item.getBBox().height / 2,
                selectionFlag: false,
            });
        }
        this.setState({ ShapesInfo }, () => {
            this.setState({
                maxWidth: this.maxWidth(this.state.ShapesInfo),
                maxHeight: this.maxHeight(this.state.ShapesInfo),
            });
        });
    }

    maxWidth = (arr) => {
        let i;
        let max = arr[0].width;
        for (i = 1; i < arr.length; i++) {
            if (arr[i].width > max) max = arr[i].width;
        }
        return max;
    };

    maxHeight = (arr) => {
        let i;
        let max = arr[0].height;
        for (i = 1; i < arr.length; i++) {
            if (arr[i].height > max) max = arr[i].height;
        }
        return max;
    };

    polylineGetPoint = (points) => {
        this.setState({ polylinepointArray: [] });
        for (let point of points) {
            point = point.split(" ");
            for (let index in point) {
                if (point[index] === "") point.splice(index, 1);
            }
            for (let value of point) {
                this.state.polylinepointArray.push(Number(value));
            }
        }
        return this.state.polylinepointArray;
    };

    polylineGetNewPointForReposition = (inputValue, points) => {
        let newPoints = [];
        for (let index in points) {
            newPoints.push(points[index] + Number(inputValue));
        }
        return this.ConversionArrayTopoint(newPoints);
    };

    ConversionArrayTopoint(points) {
        let pointFlag = false;
        let newPoint = "";
        for (let point of points) {
            if (pointFlag === false) {
                newPoint += String(point) + ", ";
                pointFlag = true;
            } else {
                newPoint += String(point) + " ";
                pointFlag = false;
            }
        }
        return newPoint;
    }

    Resize = () => {
        if (this.state.mouseUpFlag === true) {
            let ShapesInfo = this.state.ShapesInfo;
            for (let item of ShapesInfo) {
                if (item.selectionFlag === true) {
                    let inputValue = document.getElementById("Resize").value;
                    switch (item.name) {
                        case "rect":
                            item.element.setAttribute("width", inputValue);
                            item.element.setAttribute("height", inputValue);
                            //updating info of elements
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "circle":
                            item.element.setAttribute("r", inputValue);
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "ellipse":
                            item.element.setAttribute("rx", inputValue);
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "line":
                            item.element.setAttribute("x1", Number(item.element.getAttribute("x1")) + Number(inputValue));
                            item.element.setAttribute("x2", Number(item.element.getAttribute("x2")) - Number(inputValue));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "polyline":
                            let points = this.polylineGetPoint(item.element.getAttribute("points").split(","));
                            for (let index = 0; index < points.length; index++) {
                                if (index % 2 === 0) {
                                    points[index] = Number(points[index]) - Number(inputValue);
                                    points[++index] = Number(points[index]) - Number(inputValue);
                                    index += 2;
                                }
                            }
                            item.element.setAttribute("points", this.ConversionArrayTopoint(points));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };

    Rotate = () => {
        if (this.state.mouseUpFlag === true) {
            for (let item of this.state.ShapesInfo) {
                if (item.selectionFlag === true) {
                    let inputValue = document.getElementById("Rotate").value;
                    //adding the center of shape in the moment in style of that
                    item.element.setAttribute("style", "transform-origin:" + item.centerX + "px " + item.centerY + "px");
                    //setting attribute for the shape
                    item.element.setAttribute("transform", "rotate(" + inputValue + ")");
                }
            }
        }
    };

    Reposition = () => {
        if (this.state.mouseUpFlag === true) {
            for (let item of this.state.ShapesInfo) {
                if (item.selectionFlag === true) {
                    let inputValue = document.getElementById("Reposition").value;
                    switch (item.name) {
                        case "rect":
                            item.element.setAttribute("x", Number(item.element.getAttribute("x")) + Number(inputValue));
                            item.element.setAttribute("y", Number(item.element.getAttribute("y")) + Number(inputValue));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "circle":
                            item.element.setAttribute("cx", Number(item.element.getAttribute("cx")) + Number(inputValue));
                            item.element.setAttribute("cy", Number(item.element.getAttribute("cy")) + Number(inputValue));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "ellipse":
                            item.element.setAttribute("cx", Number(item.element.getAttribute("cx")) + Number(inputValue));
                            item.element.setAttribute("cy", Number(item.element.getAttribute("cy")) + Number(inputValue));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "line":
                            item.element.setAttribute("x1", Number(item.element.getAttribute("x1")) + Number(inputValue));
                            item.element.setAttribute("x2", Number(item.element.getAttribute("x2")) + Number(inputValue));
                            item.element.setAttribute("y1", Number(item.element.getAttribute("y1")) + Number(inputValue));
                            item.element.setAttribute("y2", Number(item.element.getAttribute("y2")) + Number(inputValue));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        case "polyline":
                            item.element.setAttribute("points", this.polylineGetNewPointForReposition(inputValue, this.polylineGetPoint(item.element.getAttribute("points").split(","))));
                            item.info = item.element.getBBox();
                            item.width = item.element.getBBox().width;
                            item.height = item.element.getBBox().height;
                            item.centerX = item.element.getBBox().x + item.element.getBBox().width / 2;
                            item.centerY = item.element.getBBox().y + item.element.getBBox().height / 2;
                            break;
                        default:
                    }
                }
            }
        }
    };

    onMouseDownSelectionHandler = async (e) => {
        if (this.state.mouseUpFlag === true) {
            for (let item of this.state.ShapesInfo) {
                if (item.selectionFlag === true) {
                    item.selectionFlag = false;
                }
            }
            for (let item of this.state.ShapesInfo) {
                if (item.selectionFlag === false) {
                    if (item.name === "polyline" || item.name === "line") item.element.setAttribute("stroke", "black");
                    else {
                        item.element.setAttribute("fill", "black");
                    }
                }
            }
            this.setState({
                mouseUpFlag: false,
            });
        }
        await this.Coordinate(e);
        // this.Coordinate(e).then(data=>{})
        this.setState({
            firstCoordinate: this.state.Coordinate,
            //for preventing bug
            mouseMoveCoordinat: this.state.Coordinate,
            mouseDownFlag: true,
        });
    };

    onMouseMoveSelectionHandler = async (e) => {
        if (this.state.mouseDownFlag === true) {
            await this.Coordinate(e);
            this.setState(
                {
                    mouseMoveCoordinat: this.state.Coordinate,
                },
                () => {
                    this.creatRect(this.state.firstCoordinate, this.state.mouseMoveCoordinat);
                }
            );
        }
    };

    onMouseUpSelectionHandler = (e) => {
        this.selection();
        for (let item of this.state.ShapesInfo)
            if (item.selectionFlag === true) {
                //wrapp the element in div tag
                // let replaceItem = <div>{item.element.parentNode}</div>;
                if (item.name === "polyline" || item.name === "line") item.element.setAttribute("stroke", "red");
                else {
                    item.element.setAttribute("fill", "red");
                    // console.log(item.element.parentNode.innerHTML);
                    // item.element.parentNode.innerHTML.replaceWith(replaceItem);
                }
            }
        this.setState({
            //maybe make mistake
            selectionPolygon: null,
            mouseDownFlag: false,
        });
    };

    Coordinate = (event) => {
        return new Promise((resolve) => {
            this.setState({ Coordinate: { coordinateX: event.nativeEvent.offsetX, coordinateY: event.nativeEvent.offsetY } }, () => {
                resolve();
            });
        });
    };

    creatRect = (firstCoordinate, mouseMoveCoordinat) => {
        this.setState(
            {
                pointsOfSelectionRect:
                    firstCoordinate.coordinateX +
                    ", " +
                    firstCoordinate.coordinateY +
                    " " +
                    firstCoordinate.coordinateX +
                    ", " +
                    mouseMoveCoordinat.coordinateY +
                    " " +
                    mouseMoveCoordinat.coordinateX +
                    ", " +
                    mouseMoveCoordinat.coordinateY +
                    " " +
                    mouseMoveCoordinat.coordinateX +
                    ", " +
                    firstCoordinate.coordinateY +
                    " ",
            },
            () => {
                this.setState((state) => ({
                    selectionPolygon: (
                        <g>
                            <polygon id="polygon" opacity="0.2" points={state.pointsOfSelectionRect}></polygon>
                        </g>
                    ),
                }));
            }
        );
    };

    selection = () => {
        let selectionPartInfo = document.getElementById("polygon");

        if (selectionPartInfo !== null) {
            selectionPartInfo = document.getElementById("polygon").getBBox();
            let selectionPartInfoFirstX = selectionPartInfo.x - this.state.maxWidth / 2;
            if (selectionPartInfoFirstX < 0) selectionPartInfoFirstX = 0;
            let selectionPartInfoFirstY = selectionPartInfo.y - this.state.maxHeight / 2;
            if (selectionPartInfoFirstY < 0) {
                selectionPartInfoFirstY = 0;
            }
            let selectionPartInfoSecondX = Number(selectionPartInfo.x) + Number(selectionPartInfo.width) + this.state.maxWidth / 2;
            let selectionPartInfoSecondY = Number(selectionPartInfo.y) + Number(selectionPartInfo.height) + this.state.maxHeight / 2;

            for (let item of this.state.ShapesInfo) {
                if (item.centerX >= selectionPartInfoFirstX && item.centerX <= selectionPartInfoSecondX) {
                    let selectionPartInfoFirstX = selectionPartInfo.x - item.width / 2;
                    if (selectionPartInfoFirstX < 0) selectionPartInfoFirstX = 0;
                    let selectionPartInfoSecondX = Number(selectionPartInfo.x) + Number(selectionPartInfo.width) + item.width / 2;
                    if (item.centerX >= selectionPartInfoFirstX && item.centerX <= selectionPartInfoSecondX) {
                        if (item.centerY >= selectionPartInfoFirstY && item.centerY <= selectionPartInfoSecondY) {
                            let selectionPartInfoFirstY = selectionPartInfo.y - item.height / 2;
                            if (selectionPartInfoFirstY < 0) {
                                selectionPartInfoFirstY = 0;
                            }
                            let selectionPartInfoSecondY = Number(selectionPartInfo.y) + Number(selectionPartInfo.height) + item.height / 2;
                            if (item.centerY >= selectionPartInfoFirstY && item.centerY <= selectionPartInfoSecondY) {
                                item.selectionFlag = true;
                                this.setState({ mouseUpFlag: true });
                            }
                        }
                    }
                }
            }
        }
    };

    render() {
        return (
            <div className={AppStyle.App}>
                <SvgPanel
                    onMouseDownSelectionHandler={this.onMouseDownSelectionHandler}
                    onMouseMoveSelectionHandler={this.onMouseMoveSelectionHandler}
                    onMouseUpSelectionHandler={this.onMouseUpSelectionHandler}
                    selectionPolygon={this.state.selectionPolygon}
                />
                <ActionBar Resize={this.Resize} Rotate={this.Rotate} Reposition={this.Reposition} />
            </div>
        );
    }
}
export default App;
