import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label} from 'reactstrap';
import {API_URL} from "../Constants";
import axios from 'axios';

export class HairdresserAddModal extends React.Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '1990-01-01'
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    formChanged = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    addHairdresser = () => {
        axios.post(API_URL + 'persons/add', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            dateOfBirth: this.state.dateOfBirth,
            phone: '34554'
        }).then(() => {
            this.props.addHairdresser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            });

            this.setState({
                modal: false,
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: '1990-01-01'
            });
        });
    };

    render() {
        /* name and value have to be the same */
        return (
            <div>
                <span onClick={this.toggle}>
                    + Lisa juuksur
                </span>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa juuksur</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Eesnimi</Label>
                                <Input name="firstName"
                                       placeholder="Sisesta nimi"
                                       value={this.state.firstName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Perenimi</Label>
                                <Input name="lastName"
                                       placeholder="Sisesta nimi"
                                       value={this.state.lastName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input name="email"
                                       placeholder="Sisesta nimi"
                                       value={this.state.email}
                                       onChange={this.formChanged}/>
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

