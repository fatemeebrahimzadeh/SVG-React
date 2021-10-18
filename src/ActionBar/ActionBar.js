import React, { Component } from "react";
import Button from "./Button/Button";
import ActionBarStyle from "./ActionBar.module.css";

class ActionBar extends Component {
    render() {
        return (
            <div className={ActionBarStyle.ActionBar}>
                <Button name="Resize" id="Resize" min="1" max="250" action={this.props.Resize} />
                <Button name="Rotate" id="Rotate" action={this.props.Rotate} />
                <Button name="Reposition" id="Reposition" action={this.props.Reposition} />
            </div>
        );
    }
}

export default ActionBar;
