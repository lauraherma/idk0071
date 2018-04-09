import React from 'react';
import {Input, Row, Col, FormGroup, Label, Button} from 'reactstrap'

export class ColorRecipeColor extends React.Component {
    state = {
        code: '',
        amount: '',
    };

    componentDidMount() {
        const {amount, code} = this.props.color;

        this.setState({
            amount,
            code,
        });
    }

    updateCode = event => this.setState({code: event.target.value });
    updateAmount = event => this.setState({amount: event.target.value });

    render() {
        return <div className="ColorRecipeColorTypeColor">
            <Row>
                <Col sm={5}>
                    <FormGroup>
                        <Input value={this.state.code} onChange={this.updateCode}/>
                    </FormGroup>
                </Col>

                <Col sm={5}>
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
