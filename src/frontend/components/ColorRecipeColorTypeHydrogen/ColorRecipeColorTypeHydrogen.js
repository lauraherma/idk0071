import React from 'react';
import {Input, Row, Col, FormGroup, Label, Button} from 'reactstrap'

export class ColorRecipeColorTypeHydrogen extends React.Component {
    state = {
        companyName: '',
        name: '',
        amount: '',
    };

    componentDidMount() {
        const {companyName, amount, name} = this.props.hydrogen;

        this.setState({
            companyName,
            amount,
            name,
        });
    }

    updateCompanyName = event => this.setState({companyName: event.target.value});
    updateName = event => this.setState({name: event.target.value});
    updateAmount = event => this.setState({amount: event.target.value});

    render() {
        return <div className="ColorRecipeColorTypeHydrogen">
            <Row>
                <Col sm={4}>
                    <FormGroup>
                        <Input name="name" value={this.state.companyName} onChange={this.updateCompanyName}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <Input name="name" value={this.state.name} onChange={this.updateName}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <Input name="amount" value={this.state.amount} onChange={this.updateAmount}/>
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
