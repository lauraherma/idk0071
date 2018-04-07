import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label} from 'reactstrap';
import moment from "moment";
import {RoleForm} from "../HairdresserAddModal/HairdresserAddModal";
import {DataService} from "../DataService";

export class ClientAddModal extends React.Component {
    dataService = new DataService();
    state = {
        modal: false,
        personForm: new PersonForm(),
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    addClient = () => {

        const clientData = new RoleForm();
        this.state.personForm.dateOfBirth=moment();
        clientData.person = this.state.personForm;
        this.dataService.getRoleTypeByName('client').then(response => {
            clientData.roleType = response.data;
            this.dataService.addRole(clientData).then(() => {

                this.setState({
                    modal: false,
                    personForm : new PersonForm(),

                });
            });
        });

        this.props.onClientAdded();

    };

    formChanged = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const personForm = this.state.personForm;
        personForm[name] = value;

        this.setState({
            personForm: personForm,
        });

        console.log(this.props);
    };


    render() {

        const personForm = this.state.personForm;

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
                                       value={personForm.firstName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Perenimi</Label>
                                <Input name="lastName"
                                       placeholder="Sisesta perekonnanimi"
                                       value={personForm.lastName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input name="email"
                                       placeholder="Sisesta email"
                                       value={personForm.email}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Number</Label>
                                <Input name="phone"
                                       placeholder="Sisesta number"
                                       value={personForm.phone}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Number</Label>
                                <Input name="dateOfBirth"
                                       placeholder="Sisesta sünnikuupäev"
                                       value={personForm.dateOfBirth}
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

export class PersonForm {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    dateOfBirth = '';
}


