import React from 'react';
import {Row, Col, Button, Input,FormGroup, Label} from 'reactstrap'
import {observer} from 'mobx-react';
import {setColors, removeColor, setHydrogens, removeHydrogen, openAppointment} from "../../data/openAppointment";
import {DataService} from "../DataService";

export const ColorRecipePart = observer(class extends React.Component {
    dataService = new DataService();

    state = {
        isAddingNewColor: false,
        isAddingNewHydrogen: false,
    };

    async addColor (color) {
        this.setState({ isAddingNewColor: true });

        try {
            const newColors = await this.dataService.addColorToColorRecipe(color,
                openAppointment[0].id, this.props.colorRecipe.id);

            setColors(this.props.colorRecipe, [...newColors, {}]);
        }
        catch (error) {

        }

        this.setState({ isAddingNewColor: false });
    }

    async addHydrogen (hydrogen) {
        this.setState({ isAddingNewHydrogen: true });

        try {
            console.log(openAppointment[0].id);
            const newHydrogens = await this.dataService.addHydrogenToColorRecipe({
                appointmentId: openAppointment[0].id,
                colorRecipe: this.props.colorRecipe,
                hydrogen,
            });

            setHydrogens(this.props.colorRecipe, [...newHydrogens, {}]);
        }
        catch (error) {

        }

        this.setState({ isAddingNewHydrogen: false });
    }

    getColors () {
        const colors = this.props.colorRecipe.colors;
        console.log(colors);
        return colors.map((color, index) => {
            const colorButton = color.id ?
                <Button onClick={() => removeColor(this.props.colorRecipe, color)} color="danger">
                    Delete
                </Button> :
                <Button color="secondary"
                        disabled={this.state.isAddingNewColor}
                        onClick={() => this.addColor(color)}>
                    Lisa uus värv
                </Button>;

            return <Row key={color.id || index}>
                <Col sm={4}>
                    <FormGroup>
                        <Input type="text"
                               placeholder="Sisesta värvikood"
                               onChange={event => color.code = event.target.value}
                               value={color.code}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <Input type="text"
                               placeholder="Sisesta värvi grammid"
                               onChange={event => color.amount = event.target.value}
                               value={color.amount}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        {colorButton}
                    </FormGroup>
                </Col>
            </Row>;
        });
    }

    getHydrogens () {
        const hydrogens = this.props.colorRecipe.hydrogens;

        return hydrogens.map((hydrogen, index) => {
            const hydrogenButton = hydrogen.id ?
                <Button onClick={() => removeHydrogen(this.props.colorRecipe, hydrogen)} color="danger">
                    Delete
                </Button> :
                <Button color="secondary"
                        disabled={this.state.isAddingNewHydrogen}
                        onClick={() => this.addHydrogen(hydrogen)}>
                    Lisa uus vesinik
                </Button>;

            return <Row key={hydrogen.id || index}>
                <Col sm={4}>
                    <FormGroup>
                        <Input type="text"
                               placeholder="Sisesta nimi"
                               onChange={event => hydrogen.name = event.target.value}
                               value={hydrogen.name}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <Input type="text"
                               placeholder="Sisesta kogus grammides"
                               onChange={event => hydrogen.amount = event.target.value}
                               value={hydrogen.amount}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        {hydrogenButton}
                    </FormGroup>
                </Col>
            </Row>;
        });
    }

    getColorTypes() {
        const colorRecipe = this.props.colorRecipe;
        const colorCompanyName = colorRecipe.colors && colorRecipe.colors[0] && colorRecipe.colors[0].company_name;

        return <div>
            <Row>
                <Col sm={12}>
                    <FormGroup>
                        <Label>Värvi firma</Label>
                        <Input type="text" placeholder="Sisesta värvi firma" value={colorCompanyName}/>
                    </FormGroup>
                </Col>
            </Row>

            {this.getColors()}

            <Row>
                <Col sm={12}>
                    <FormGroup>
                        <Label>Vesiniku firma</Label>
                        <Input type="text" placeholder="Sisesta vesiniku firma"/>
                    </FormGroup>
                </Col>
            </Row>
            
            {this.getHydrogens()}
        </div>
    }

    render() {
        return <div className="ColorRecipePart">
            {this.getColorTypes()}
        </div>;
    }
});
