import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColorTypeColor/ColorRecipeColorTypeColor";
import {ColorRecipeColorTypeHydrogen} from "../ColorRecipeColorTypeHydrogen/ColorRecipeColorTypeHydrogen";
import {Row, Col, Button} from 'reactstrap'
import lodash from 'lodash';

export class ColorRecipePart extends React.Component {
    state = {
        name: '',
        colors: [],
        hydrogens: [],
    };

    componentDidMount() {
        const { colorRecipeType, colors, hydrogens } = this.props.colorRecipePart;

        this.setState({
            name: colorRecipeType.name,
            colors,
            hydrogens,
        });
    }

    addColorTypeColor = () => {
        this.setState({
            colors: [
                ...this.state.colors,
                {},
            ]
        });
    };

    addHydrogen = () => {
        this.setState({
            hydrogens: [
                ...this.state.hydrogens,
                {},
            ]
        });
    };

    getColorRecipes() {
        const colorRecipes = [
            {
                id: 1,
                name: 'Sebastian',
            },
            {
                id: 2,
                name: 'Pastellimine',
            }
        ];

        return colorRecipes.map(colorRecipe => <option key={colorRecipe.id}>{colorRecipe.name}</option>);
    }

    getColorTypes () {
        return <div>
            <Row>
                <Col sm={2} className="d-flex align-items-center">
                    <h5>Värvitüüp</h5>
                </Col>

                <Col sm={10}>
                    <select name="name"
                            placeholder="Värvi"
                            value={this.state.name}
                            onChange={this.startTimeChanged}
                            className="custom-select">
                        {this.getColorRecipes()}
                    </select>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col sm={{size: 10, offset: 2}}>
                    <Row>
                        <Col sm={5}>Värvikood</Col>
                        <Col sm={5}>Grammid</Col>
                    </Row>

                    {this.state.colors.map(color =>
                        <ColorRecipeColor key={color.id}
                                          delete={() => this.deleteColorRecipeColor(color)}
                                          color={color}/>
                    )}
                    <Button color="secondary" onClick={this.addColorTypeColor}>Lisa</Button>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col sm={{size: 10, offset: 2}}>
                    <Row>
                        <Col sm={5}>Vesinik</Col>
                        <Col sm={5}>Grammid</Col>
                    </Row>

                    {this.state.hydrogens.map(hydrogen =>
                        <ColorRecipeColorTypeHydrogen key={hydrogen.id}
                                                      delete={() => this.deleteColorRecipeHydrogen(hydrogen)}
                                                      hydrogen={hydrogen}/>
                    )}

                    <Button color="secondary" onClick={this.addHydrogen}>Lisa</Button>
                </Col>
            </Row>
        </div>
    }

    render() {
        return <div className="ColorRecipePart">
            { this.getColorTypes() }
        </div>;
    }

    deleteColorRecipeColor(color) {
        this.setState({
            colors: lodash.without(this.state.colors, color),
        });
    }

    deleteColorRecipeHydrogen(hydrogen) {
        this.setState({
            hydrogens: lodash.without(this.state.hydrogens, hydrogen),
        });
    }
}
