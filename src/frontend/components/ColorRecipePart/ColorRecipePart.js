import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColorTypeColor/ColorRecipeColorTypeColor";
import {ColorRecipeColorTypeHydrogen} from "../ColorRecipeColorTypeHydrogen/ColorRecipeColorTypeHydrogen";
import {Row, Col, Button} from 'reactstrap'
import lodash from 'lodash';

export class ColorRecipePart extends React.Component {
    state = {
        colors: [],
        hydrogens: [],
    };

    componentDidMount() {
        const { colors, hydrogens } = this.props.colorRecipePart;

        this.setState({
            colors,
            hydrogens,
        });
    }

    addColorTypeColor = () => {
        this.setState({
            colors: [
                ...this.state.colors,
                {
                    companyName: '',
                    code: '',
                    amount: '',
                },
            ]
        });
    };

    addHydrogen = () => {
        this.setState({
            hydrogens: [
                ...this.state.hydrogens,
                {
                    companyName: '',
                    name: '',
                    amount: '',
                },
            ]
        });
    };

    getColorRecipes() {
        const colorCards = [
            {
                id: 1,
            },
            {
                id: 2,
            }
        ];
        /*return this.props.colorCard.colorRecipe.map(colorRecipe =>
        )*/

        return colorCards.map(colorRecipe => <option key={colorRecipe.id}></option>);
    }


    getColorTypes () {
        return <div>
            <Row>
                <Col sm={2} className="d-flex align-items-center">
                    <h5>Värvitüüp</h5>
                </Col>

                <Col sm={10}>
                    <select placeholder="Värvi"
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

                    {this.state.colors.map((color, index) =>
                        <ColorRecipeColor key={index}
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

                    {this.state.hydrogens.map((hydrogen, index) =>
                        <ColorRecipeColorTypeHydrogen key={index}
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
