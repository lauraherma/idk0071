import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColor/ColorRecipeColor";
import {ColorRecipeHydrogen} from "../ColorRecipeHydrogen/ColorRecipeHydrogen";
import {Row, Col, Button} from 'reactstrap'


export class ColorRecipe extends React.Component {
    state = {
        colorRecipeName: '',
    };

    componentDidMount() {
        this.setState({colorRecipeName: this.props.colorRecipe.colorRecipeType.name});
    }

    getColorRecipes() {
        const colorRecipes = [
            {
                id: 1,
                name: 'Sebastian',
            },
            {
                id: 2,
                name: 'Pastellimine',
            }];
        return colorRecipes.map(colorRecipe => <option key={colorRecipe.id}>{colorRecipe.name}</option>);

    }

    render() {
        return <div className="ColorRecipe">
            <h3>Värvikaart</h3>
            <hr/>

            <h4>Värviretsept</h4>

            <Row>
                <Col sm={6}>
                    <h5>Värvitüüp</h5>
                </Col>

                <Col sm={6}>
                    <select name="name"
                            placeholder="Värvi"
                            value={this.state.colorRecipeName}
                            onChange={this.startTimeChanged}
                            className="custom-select">
                        {this.getColorRecipes()}
                    </select>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <h5>Värvid</h5>
                </Col>

                <Col sm={6}>
                    <Row>
                        <Col sm={6}>Värvikood</Col>
                        <Col sm={6}>Grammid</Col>
                    </Row>

                    {this.props.colorRecipe.colors.map(color =>
                        <ColorRecipeColor key={color.id} color={color}/>
                    )}
                    <Button color="secondary" onClick={this.toggle}>Lisa</Button>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <h5>Vesinikud</h5>
                </Col>

                <Col sm={6}>
                    <Row>
                        <Col sm={6}>Vesinik</Col>
                        <Col sm={6}>Grammid</Col>
                    </Row>

                    {this.props.colorRecipe.hydrogens.map(hydrogen =>
                        <ColorRecipeHydrogen key={hydrogen.id} hydrogen={hydrogen}/>
                    )}
                    <Button color="secondary" onClick={this.toggle}>Lisa</Button>
                </Col>
                <Button color="primary"  block>Lisa värviretsept</Button>

            </Row>

        </div>;
    }
}
