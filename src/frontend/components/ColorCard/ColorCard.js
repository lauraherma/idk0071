import React from 'react';
import {ColorRecipe} from "../ColorRecipe/ColorRecipe";

export class ColorCard extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        return <div className="ColorCard">
            <ColorRecipe colorRecipe={this.props.colorCard.colorRecipe}/>
        </div>;
    }
}
