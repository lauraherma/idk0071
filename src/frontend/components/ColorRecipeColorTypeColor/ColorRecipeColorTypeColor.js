import React from 'react';
import {Input, Row, Col, FormGroup, Label, Button} from 'reactstrap'

export class ColorRecipeColor extends React.Component {
    state = {
        companyName: '',
        code: '',
        amount: '',
    };

    componentDidMount() {
        const {companyName, amount, code} = this.props.color;

        this.setState({
            companyName,
            amount,
            code,
        });
    }

    updateCompanyName = event => this.setState({companyName: event.target.value});
    updateCode = event => this.setState({code: event.target.value });
    updateAmount = event => this.setState({amount: event.target.value });

    render() {
        return <div className="ColorRecipeColorTypeColor">
            <Row>
                <Col sm={4}>
                    <FormGroup>
                        <Input value={this.state.companyName} onChange={this.updateCompanyName}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <Input value={this.state.code} onChange={this.updateCode}/>
                    </FormGroup>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <Input value={this.state.amount} onChange={this.updateAmount}/>
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
