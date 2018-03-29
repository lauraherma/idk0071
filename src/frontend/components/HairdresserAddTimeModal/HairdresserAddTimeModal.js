import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";
import {API_URL} from "../Constants";
import axios from "axios/index";
import {AddWorkTypeButton} from "../AddWorkTypeButton/AddWorkTypeButton";

export class HairdresserAddTimeModal extends React.Component {
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
        workTypes: [{
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

        axios.post(API_URL + 'appointments/add', {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            description: this.state.description,
            hairdresser: this.state.hairdresser,
            client: this.state.client,
            work: this.state.work
        }).then(() => {
            this.props.addAppointment({
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                description: this.state.description,
                hairdresser: this.state.hairdresser,
                client: this.state.client,
                work: this.state.work
            });

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
            startTime: this.props.timeSlot.format(),
            endTime: this.props.timeSlot.clone().add(90, 'minutes').format(),
            firstName: "",
            modal: false,
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

    getWorkTypes() {

        return this.state.workTypes.map(workType => {
            return <FormGroup check inline>
                <Label check>
                    <Input type="checkbox"/>
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

        return (
            <div>
                <i onClick={this.toggle} className="fas fa-plus-circle"/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa Aeg</ModalHeader>
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

                                            {this.getTimeOptions()}
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

