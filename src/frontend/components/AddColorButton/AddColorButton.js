import React from 'react';
import {FormGroup, Input, Label, Button, Form, Col, Row} from 'reactstrap';
import {DataService} from "../DataService";

export class AddColorButton extends React.Component {

    dataService = new DataService();
    state = {
        isInputVisible: false,
        color: {code: "", amount: ""},
    };

    toggle = () => {
        this.setState({
            isInputVisible: !this.state.isInputVisible,
        });
    };
    colorChanged = (event) => {
        this.setState({
            color: {code: event.target.value},
        })
    };

    addColor = () => {
        this.dataService.addColor(this.state.color).then(() => {
            this.props.addColor(this.state.color);

            this.setState({
                color: {code: "", amount: ""},
                isInputVisible: false,
            })
        });
    };

    getFormGroup = () => {
        if (this.state.isInputVisible) {
            return <Form>
                <Row>
                <Col sm={5}>
                <FormGroup>
                    <Label>Lisa värv</Label>
                    <Input name="color_recipe_colors"
                           placeholder="Lisa uus värv"
                           value={this.state.color.code}
                           onChange={this.colorChanged}/>
                </FormGroup>
                </Col>
                <Col sm={5}>
                <FormGroup>
                    <Label>Lisa värv</Label>
                    <Input name="color_recipe_colors"
                           placeholder="Lisa uus värv"
                           value={this.state.color.amount}
                           onChange={this.colorChanged}/>
                </FormGroup>
                </Col>
                </Row>
                <Button color="secondary" onClick={this.addColor}>Lisa</Button>
            </Form>
        }
    };


    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.toggle}>Lisa uus värv</Button>
                {this.getFormGroup()}
            </div>
        )
    }

}
