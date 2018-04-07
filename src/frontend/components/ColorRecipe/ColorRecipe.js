import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColor/ColorRecipeColor";
import {ColorRecipeHydrogen} from "../ColorRecipeHydrogen/ColorRecipeHydrogen";

export class ColorRecipe extends React.Component {
    state = {};

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return <div className="ColorRecipe">
            Color recipe id: {this.props.colorRecipe.id}
            <br/>
            <h4>Type name: {this.props.colorRecipe.colorRecipeType.name}</h4>

            <h5>Värvid</h5>
            {this.props.colorRecipe.colors.map(color =>
                <ColorRecipeColor key={color.id} color={color}/>
            )}

            <h5>Vesinikud</h5>
            {this.props.colorRecipe.hydrogens.map(hydrogen =>
                <ColorRecipeHydrogen key={hydrogen.id} hydrogen={hydrogen}/>
            )}
        </div>;
    }
}
