import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label} from 'reactstrap';
import {DataService} from "../DataService";
import {updateHairdressers} from "../../data/hairdressers";

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
        const hairDresserForm = this.state.hairdresserForm;
        hairDresserForm[name] = value;

        this.setState({
            hairdresserForm: hairDresserForm
        });
    };

    addHairdresser = () => {
        const hairdresserData = new RoleForm();
        hairdresserData.person = this.state.hairdresserForm;
        this.dataService.getRoleTypeByName('hairdresser').then(response => {
            hairdresserData.roleType = response.data;
            this.dataService.addRole(hairdresserData).then(() => {
                updateHairdressers();

                this.setState({
                    modal: false,
                    hairdresserForm: new HairdresserForm(),
                });
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
                                       placeholder="Sisesta eesnimi"
                                       value={hairdresserForm.firstName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Perenimi</Label>
                                <Input name="lastName"
                                       placeholder="Sisesta perenimi"
                                       value={hairdresserForm.lastName}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input name="email"
                                       placeholder="Sisesta email"
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
    firstName = '';
    lastName = '';
    email = '';
    dateOfBirth = '';
}

export class RoleForm {
    person;
    roleType;
}

