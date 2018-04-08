import React from 'react';
import {Input, Row, Col, FormGroup, Label,} from 'reactstrap'


export class ColorRecipeColor extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        const {amount, code} = this.props.color;

        return <div className="ColorRecipeColor">
            <Row>
                <Col col={6}>
                    <FormGroup>
                        <Input value={code}/>
                    </FormGroup>
                </Col>

                <Col col={6}>
                    <FormGroup>
                        <Input value={amount}/>
                    </FormGroup>
                </Col>
            </Row>
        </div>;
    }
}
