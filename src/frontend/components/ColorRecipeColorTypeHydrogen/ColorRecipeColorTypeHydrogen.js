import React from 'react';
import {Input, Row, Col, FormGroup, Label, Button} from 'reactstrap'

export class ColorRecipeColorTypeHydrogen extends React.Component {
    state = {
        name: '',
        amount: '',
    };

    componentDidMount() {
        const {amount, name} = this.props.hydrogen;

        this.setState({
            amount,
            name,
        });
    }

    updateName = event => this.setState({name: event.target.value});
    updateAmount = event => this.setState({amount: event.target.value});

    render() {
        return <div className="ColorRecipeColorTypeHydrogen">
            <Row>
                <Col sm={5}>
                    <FormGroup>
                        <Input placeholder="Sisesta vesiniku nimi" name="name" value={this.state.name} onChange={this.updateName}/>
                    </FormGroup>
                </Col>

                <Col sm={5}>
                    <FormGroup>
                        <Input placeholder="Sisesta vesiniku grammid" name="amount" value={this.state.amount} onChange={this.updateAmount}/>
                    </FormGroup>
                </Col>

                <Col sm={2}>
                    <FormGroup>
                        <Button onClick={() => this.props.delete()} color="danger" block>Delete</Button>
                    </FormGroup>
                </Col>
            </Row>
        </div>;
    }
}
