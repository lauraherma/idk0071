import React from 'react';
import {Input, Row, Col, FormGroup, Label, Button} from 'reactstrap'

export class ColorRecipeColorTypeHydrogen extends React.Component {
    state = {};

    componentDidMount() {
    }

    render() {
        const {amount, name} = this.props.hydrogen;

        return <div className="ColorRecipeColorTypeHydrogen">
            <Row>
                <Col sm={5}>
                    <FormGroup>
                        <Input value={name}/>
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
