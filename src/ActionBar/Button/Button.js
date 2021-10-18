import React, { Component } from "react";
import ActionBarStyle from "../ActionBar.module.css";

class Button extends Component {
    render() {
        return (
            <div>
                <label>
                    <input type="number" id={this.props.id} min={this.props.min} max={this.props.max} />
                </label>
                <br />
                <button className={ActionBarStyle.ActionBar__btn} id={this.props.id} onClick={this.props.action}>
                    {this.props.name}
                </button>
            </div>
        );
    }
}
export default Button;
