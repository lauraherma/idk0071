import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColorTypeColor/ColorRecipeColorTypeColor";
import {ColorRecipeColorTypeHydrogen} from "../ColorRecipeColorTypeHydrogen/ColorRecipeColorTypeHydrogen";
import {Row, Col, Button} from 'reactstrap'
import lodash from 'lodash';
import './ColorRecipe.css';
import {ColorRecipePart} from "../ColorRecipePart/ColorRecipePart";

export class ColorRecipe extends React.Component {
    state = {
        recipeParts: [],
    };

    componentDidMount() {
        this.setState({
            recipeParts: this.props.colorRecipe.parts,
        });
    }

    render() {
        return <div className="ColorRecipe">
            <h4>Värviretsept</h4>

            {this.state.recipeParts.map((recipePart, index) => <ColorRecipePart key={index} colorRecipePart={recipePart}/>)}

            <Button onClick={() => this.addRecipePart()} color="primary" block>
                Lisa värviretsepti osa
            </Button>
        </div>;
    }

    addRecipePart() {
        this.setState({
            recipeParts: [
                ...this.state.recipeParts,
                {
                    colorRecipeType: {},
                    colors: [],
                    hydrogens: [],
                }
            ]
        });
    }
}
