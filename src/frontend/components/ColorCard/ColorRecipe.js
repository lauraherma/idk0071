import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColorTypeColor/ColorRecipeColorTypeColor";
import {ColorRecipeColorTypeHydrogen} from "../ColorRecipeColorTypeHydrogen/ColorRecipeColorTypeHydrogen";
import {Row, Col, Button} from 'reactstrap'
import './ColorRecipe.css';
import {ColorRecipePart} from "../ColorRecipePart/ColorRecipePart";

export class ColorRecipe extends React.Component {
    state = {
        recipeParts: [],
    };

    componentDidMount() {
        this.setState({
            recipeParts: this.props.colorRecipe,
        });
    }

    render() {
        return <div className="ColorRecipe">
            <h4>Värviretsept</h4>


           <ColorRecipePart/>

            <Button onClick={() => this.addRecipePart()} color="primary" block>
                Lisa uus värviretsepti osa
            </Button>
        </div>;
    }

    addRecipePart() {
        this.setState({
            recipeParts: [
                ...this.state.recipeParts,
                {
                    colors: [],
                    hydrogens: [],
                }
            ]
        });
    }
}
