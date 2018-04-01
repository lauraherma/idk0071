import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label} from 'reactstrap';
import {API_URL} from "../Constants";
import axios from 'axios';

export class ClientAddModal extends React.Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '1990-01-01',
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    addClient = () => {
        this.props.onClientAdded({
            id:Math.random(),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone:this.state.phone,
            dateOfBirth:this.state.dateOfBirth,

        });

        this.setState({
            modal: false,
            firstName: '',
            lastName: '',
            email: '',
            phone: 12345,
            dateOfBirth: '1990-01-01'
        });

    }

    formChanged = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <div>
                <Button onClick={this.toggle}>
                    + Lisa Klient
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa Klient</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Eesnimi</Label>
                                <Input name="firstName"
                                       placeholder="Sisesta eesnimi"
                                       value={this.state.firstName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Perenimi</Label>
                                <Input name="lastName"
                                       placeholder="Sisesta perekonnanimi"
                                       value={this.state.lastName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input name="email"
                                       placeholder="Sisesta email"
                                       value={this.state.email}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Number</Label>
                                <Input name="phone"
                                       placeholder="Sisesta number"
                                       value={this.state.phone}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Number</Label>
                                <Input name="dateOfBirth"
                                       placeholder="Sisesta sünnikuupäev"
                                       value={this.state.dateOfBirth}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.addClient}>Lisa Klient</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

