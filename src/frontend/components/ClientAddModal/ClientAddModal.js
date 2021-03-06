import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label} from 'reactstrap';
import moment from "moment";
import {RoleForm} from "../HairdresserAddModal/HairdresserAddModal";
import {DataService} from "../DataService";
import {observer} from 'mobx-react';
import {updateClients} from "../../data/clients";
import {updateHairdressers} from "../../data/hairdressers";


export const ClientAddModal = observer(class ClientAddModal extends React.Component {
    dataService = new DataService();

    state = {
        personForm: new PersonForm(),
    };

    toggle = () => {
        this.props.close();
    };

    componentDidMount() {
        if (this.props.client) {
            this.setStateFromClient();
        }
    }

    addClient = () => {
        const clientData = new RoleForm();
        let date = moment(this.state.personForm.dateOfBirth);
        clientData.person = this.state.personForm;
        clientData.person.dateOfBirth = date;


        if (this.props.client) {
            if (clientData.id === undefined) {
                clientData.id = this.props.client.id;
            }
        }

        this.dataService.getRoleTypeByName('client').then(response => {
            clientData.roleType = response.data;
            this.dataService.addRole(clientData).then(() => {
                updateClients();
                this.setState({
                    modal: false,
                });
            });
        });

        this.state.personForm = new PersonForm();

    };

    removeClient = () => {

        this.dataService.getAppointmentsByClientId(this.props.client.id).then(response => {
            if (response.data.length > 0) {
                console.log(response.data);
                alert("You cannot remove a client with associated appointments!");
            } else {
                this.dataService.removeRole(this.props.client.id).then(() => {
                    updateClients();
                    this.setState({
                        modal: false,
                    });
                });
            }
        });
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

    };

    setStateFromClient = () => {
        const client = this.props.client;

        const personForm = {
            firstName : client.person.firstName,
            lastName : client.person.lastName,
            email : client.person.email,
            phone : client.person.phone,
            dateOfBirth : client.person.dateOfBirth,
        };

        this.setState({ personForm });
    };


    render() {
        const personForm = this.state.personForm;

        const buttonGroup = this.props.client ?
            <div>
                <Button color="danger" onClick={this.removeClient}>Kustuta</Button>
                <Button color="primary" onClick={this.toggle}>Muuda</Button>
            </div> :
            <Button onClick={this.toggle}>+ Lisa Klient</Button>;

        const modalButtonGroup = this.props.client ?
            <div>
                <Button color="light" onClick={this.toggle}>Cancel</Button>
                <Button color="danger" onClick={this.removeClient}>Kustuta</Button>
                <Button color="primary" onClick={this.addClient}>Muuda</Button>
            </div> :
            <div>
                <Button color="light" onClick={this.toggle}>Cancel</Button>
                <Button color="primary" onClick={this.addClient}>Lisa Klient</Button>
            </div>;

        const modalTitle = this.props.client ? 'Muuda kliendi andmeid' : `Lisa klient`;


        return (
            <div>
                <Modal isOpen={this.props.isOpened} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
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
                                <Label>Sünnikuupäev</Label>
                                <Input name="dateOfBirth"
                                       placeholder="Sisesta sünnikuupäev"
                                       value={personForm.dateOfBirth}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        {modalButtonGroup}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
});

export class PersonForm {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    dateOfBirth = '';
}


