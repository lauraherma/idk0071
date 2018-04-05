import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";
import {DataService} from "../DataService";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

import lodash from 'lodash';
import {API_URL} from "../Constants";
import axios from "axios/index";
import {AddWorkTypeButton} from "../AddWorkTypeButton/AddWorkTypeButton";

export class HairdresserAddTimeModal extends React.Component {

    dataService = new DataService();

    state = {
        appointmentForm: new AppointmentForm(),
        modal: false,
        fullName: '',
        allWorks: [],
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
        workTypes: [
            {
                id: 1,
                name: "Lõikus",
            }, {
                id: 2,
                name: "Soeng",
            }, {
                id: 3,
                name: "Värvimine",
            },
        ],
        checkedWorkTypes: [],
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

    startTimeChanged = (event) => {
        this.setState({
            startTime: event.target.value,
        })
    };
    endTimeChanged = (event) => {
        this.setState({
            endTime: event.target.value,
        })
    };

    workTypeChanged = (event) => {
        const id = Number(event.target.value)
        if (event.target.checked) {
            this.setState({
                checkedWorkTypes: [...this.state.checkedWorkTypes, id]
            })
        }
        else {
            this.setState({
                checkedWorkTypes: lodash.without(this.state.checkedWorkTypes, id)
            })
        }
    };


    formChanged = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    addTime = () => {
        this.componentDidMount();
    };

    addAppointment = () => {
        this.getClient();


        this.dataService.addAppointment(this.state.appointmentForm)
            .then(() => {
                this.props.addAppointment(this.state.appointmentForm);

                this.setState({
                    modal: false,
                    appointmentForm: new AppointmentForm(),
                    allClients: [],
                });
            });

        this.addTime();
    };

    getClient() {
        axios.get(API_URL + 'roles/client/' + this.state.firstName + '&' + this.state.lastName, {
            client: this.state.client
        });
    }

    getAvailableWorks() {
        return this.props.allWorks.map(work => {
            return <option key={work} value={work}>{work}</option>;
        });
    }

    componentDidMount() {
        this.setState({
            startTime: this.props.timeSlot.format(),
            endTime: this.props.timeSlot.clone().add(90, 'minutes').format(),
            firstName: "",
            modal: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modal: nextProps.isOpened,
        });
    }

    getTimeOptions() {
        const timeSlots = [];

        for (let i = 0; i < 26; i++) {
            const halfHourInMinutes = 30;

            const timeSlot = moment()
                .startOf('day')
                .set('hour', 8)
                .add(i * halfHourInMinutes, 'minute');

            timeSlots.push(timeSlot);
        }

        return timeSlots.map(timeSlot => {
            const formatted = timeSlot.format('HH:mm');
            return <option key={formatted} value={timeSlot.format()}>{formatted}</option>;
        });
    }

    _handleSearch = (name) => {
        console.log(name);
        this.setState({isLoading: true});
        this.dataService.getClients(name)
            .then(options => {
                return options.data.map(d => {
                    d.label = d.person.firstName + ' ' + d.person.lastName;
                    return d;
                });
            })
            .then(options => {
                this.setState({
                    isLoading: false,
                    options: options
                });
            });
    };

    render() {
        const appointmentForm = this.state.appointmentForm;
        return (
            <div>
                <i onClick={this.toggle} className="fas fa-plus-circle"/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa Aeg</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <div>
                                    <AsyncTypeahead
                                        labelKey="label"
                                        minLength={2}
                                        onSearch={this._handleSearch}
                                        isLoading={this.state.isLoading}
                                        placeholder="Kliendi nimi..."
                                        options={this.state.options}
                                    />
                                </div>
                                <Label>Nimi *</Label>
                                <Input name="firstName"
                                       placeholder="Sisesta ees- ja perenimi"
                                       value={this.state.firstName}
                                       onChange={this.firstNameChanged}/>
                            </FormGroup>
                            <FormGroup>
                                <div>Tööliik</div>
                                {this.getWorkTypes()}
                                <AddWorkTypeButton addWorkType={this.addWorkType}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Lisa kirjeldus</Label>
                                <Input name="description"
                                       placeholder="Kirjeldus"
                                       value={appointmentForm.description}
                                       onChange={this.formChanged}/>
                                <Label>Töö liik</Label>
                                <select name="work"
                                        value={appointmentForm.work}
                                        onChange={this.formChanged}
                                        className="custom-select">

                                    {this.getAvailableWorks()}
                                </select>
                                <a>Tegu on uue kliendiga? Registreeri ta siin!</a>
                            </FormGroup>
                            <FormGroup>
                                <Label>Hind</Label>
                                <Input name="price"
                                       placeholder="Sisesta hind"
                                       value={this.state.price}
                                       onChange={this.formChanged}
                                       type='number'/>
                            </FormGroup>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Algus *</Label>
                                        <select name="startTime"
                                                placeholder="HH:mm"
                                                value={appointmentForm.startTime}
                                                onChange={this.startTimeChanged}
                                                className="custom-select">

                                            {this.getTimeOptions()}
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Lõpp *</Label>
                                        <select name="endTime"
                                                placeholder="HH:mm"
                                                value={appointmentForm.endTime}
                                                onChange={this.endTimeChanged}
                                                className="custom-select">
                                            {this.getTimeOptions()}
                                        </select>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.addAppointment}>Lisa aeg</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export class AppointmentForm {
    firstName;
    lastName;
    fullName;
    startTime;
    endTime;
    description;
    hairdresser;
    client;
    work;
    allClients;
    allWorks;
}
