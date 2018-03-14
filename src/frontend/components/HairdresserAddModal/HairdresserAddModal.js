import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label} from 'reactstrap';
import {API_URL} from "../Constants";
import axios from 'axios';
import {DataService} from "../DataService";

export class HairdresserAddModal extends React.Component {
    dataService = new DataService();
    state = {
        modal: false,
        hairdresserForm: new HairdresserForm(),
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
        this.dataService.addPerson(this.state.hairdresserForm)
            .then(() => {this.props.addHairdresser(this.state.hairdresserForm);

            this.setState({
                modal: false,
                hairdresserForm: new HairdresserForm(),
            });
        });
    };

    render() {
        const hairdresserForm = this.state.hairdresserForm;

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
                                       value={hairdresserForm.firstName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Perenimi</Label>
                                <Input name="lastName"
                                       placeholder="Sisesta nimi"
                                       value={hairdresserForm.lastName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input name="email"
                                       placeholder="Sisesta nimi"
                                       value={hairdresserForm.email}
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

export class HairdresserForm {
    firstName;
    lastName;
    email;
    dateOfBirth;
}

