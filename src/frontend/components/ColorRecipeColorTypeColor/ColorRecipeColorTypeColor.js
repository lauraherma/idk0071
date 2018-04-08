import React from 'react';
import {Input, Row, Col, FormGroup, Label,Button} from 'reactstrap'

export class ColorRecipeColor extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        const {amount, code} = this.props.color;

        return <div className="ColorRecipeColorTypeColor">
            <Row>
                <Col sm={5}>
                    <FormGroup>
                        <Input value={code}/>
                    </FormGroup>
                </Col>

                <Col sm={5}>
                    <FormGroup>
                        <Input value={amount}/>
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
