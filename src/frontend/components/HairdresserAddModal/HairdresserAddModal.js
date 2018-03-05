import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label,} from 'reactstrap';

export class HairdresserAddModal extends React.Component {
    state = {
        modal: false,
        firstName: '',
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    firstNameChanged = (event) => {
        this.setState({
            firstName: event.target.value,
        })
    };

    addHairdresser = () => {
        fetch('http://localhost:8080/persons/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: 'yourValue',
                lastName: 'yourOtherValue',
                email: 'e@gmail.com',
                dateOfBirth: '2018-06-25',
                phone: '34554'
            })
        });

        this.props.addHairdresser({
            firstName: this.state.firstName,
        });
        this.setState({
            firstName: '',
            modal: false,
        })
    };

    render() {
        return (
            <div>
                <Button color="primary"
                        onClick={this.toggle}>+ Lisa juuksur
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa juuksur</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Nimi</Label>
                                <Input name="name"
                                       placeholder="Sisesta nimi"
                                       value={this.state.firstName}
                                       onChange={this.firstNameChanged}/>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.addHairdresser}>Lisa juuksur</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

