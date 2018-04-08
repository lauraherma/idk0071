import React from 'react';
import {Input, Row, Col, FormGroup, Label,} from 'reactstrap'


export class ColorRecipeHydrogen extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        const {amount, name} = this.props.hydrogen;

        return <div className="ColorRecipeHydrogen">

            <Row>
                <Col col={6}>
                    <FormGroup>
                        <Input value={name}/>
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
