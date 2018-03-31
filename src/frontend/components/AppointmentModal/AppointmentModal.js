import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";
import lodash from 'lodash';
import {API_URL} from "../Constants";
import axios from "axios/index";
import {AddWorkTypeButton} from "../AddWorkTypeButton/AddWorkTypeButton";

export class AppointmentModal extends React.Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        startTime: '',
        endTime: '',
        description: '',
        hairdresser: '',
        client: '',
        work: '',
        allClients: [],
        allWorks: [],
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

        const newAppointment = {
            startTime: moment(this.state.startTime),
            endTime: moment(this.state.endTime).subtract(1, 'second'),
            description: this.state.description,
            hairdresser: this.state.hairdresser,
            client: this.state.client || {
                firstName: this.state.firstName
            },
            work: this.state.work,
            workTypes: this.state.checkedWorkTypes.map(id => lodash.find(this.state.workTypes, {
                id: id
            }))
        };

        this.props.addTime(newAppointment);

        axios.post(API_URL + 'appointments/add', newAppointment).then(() => {
            this.props.addTime(newAppointment);

            this.setState({
                modal: false,
                firstName: '',
                lastName: '',
                startTime: '',
                endTime: '',
                description: '',
                hairdresser: '',
                client: '',
                work: '',
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
            firstName: this.props.appointment.client.firstName,
            checkedWorkTypes: this.props.appointment.workTypes.map(workType => workType.id),
            description: this.props.appointment.description,
            startTime: this.props.appointment.startTime.format(),
            endTime: this.props.appointment.endTime.clone().add(1, 'second').format(),


        });
    }

    getTimeOptions(checkedTime) {
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
            const isTimeChecked = moment(checkedTime).format('HH:mm') === formatted;
            return <option checked={isTimeChecked} key={formatted} value={timeSlot.format()}>{formatted}</option>;
        });
    }

    getWorkTypes() {

        return this.state.workTypes.map(workType => {
            const isChecked = this.state.checkedWorkTypes.includes(workType.id);
            return <FormGroup key={workType.id} check inline>
                <Label check>
                    <Input checked={isChecked} type="checkbox" value={workType.id} onChange={this.workTypeChanged}/>
                    {workType.name}
                </Label>
            </FormGroup>

        })
    }

    addWorkType = (workType) => {
        this.setState({
            workTypes: [
                ...this.state.workTypes,
                {
                    id: Math.random(),
                    name: workType,
                }
            ]

        })


    };


    render() {


        const appointmentLabel = <span>
            {this.props.appointment.client.firstName}
            <br/>
            {this.props.appointment.workTypes.map(workType => workType.name).join(", ")}
            </span>

        return (
            <div>
                <span onClick={this.toggle}>{appointmentLabel}</span>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Muuda aega</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
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
                                <Label>Kirjeldus</Label>
                                <Input name="description"
                                       placeholder="Sisesta kirjeldus"
                                       value={this.state.description}
                                       onChange={this.formChanged}/>
                            </FormGroup>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Algus *</Label>
                                        <select name="startTime"
                                                placeholder="HH:mm"
                                                value={this.state.startTime}
                                                onChange={this.startTimeChanged}
                                                className="custom-select">

                                            {this.getTimeOptions(this.state.startTime)}
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Lõpp *</Label>
                                        <select name="endTime"
                                                placeholder="HH:mm"
                                                value={this.state.endTime}
                                                onChange={this.endTimeChanged}
                                                className="custom-select">
                                            {this.getTimeOptions(this.state.endTime)}
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" onClick={this.props.removeAppointment}>Kustuta</Button>
                        <Button color="primary" onClick={this.addAppointment}>Muuda</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

