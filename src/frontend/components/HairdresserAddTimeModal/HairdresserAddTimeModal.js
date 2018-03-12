import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";
import {API_URL} from "../Constants";
import axios from "axios/index";

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
            return <option key={work} value={work}>{work.name}</option>;
        });
    }

    componentDidMount() {
        this.setState({
            startTime: this.props.timeSlot.format(),
            endTime:this.props.timeSlot.clone().add(90,'minutes').format(),
            firstName:"",
            modal:false,
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

    render() {

        return (
            <div>
                <i onClick={this.toggle} className="fas fa-plus-circle"/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa Aeg</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input name="firstName"
                                       placeholder="Sisesta eesnimi"
                                       value={this.state.firstName}
                                       onChange={this.firstNameChanged}/>
                                <Input name="lastName"
                                       placeholder="Sisesta perenimi"
                                       value={this.state.lastName}
                                       onChange={this.formChanged}/>
                                <Input name="description"
                                       placeholder="Kirjeldus"
                                       value={this.state.description}
                                       onChange={this.formChanged}/>
                                <Label>Töö liik</Label>
                                <select name="work"
                                        value={this.state.work}
                                        onChange={this.formChanged}
                                        className="custom-select">

                                    {this.getAvailableWorks()}
                                </select>
                                <a>Tegu on uue kliendiga? Registreeri ta siin!</a>
                            </FormGroup>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>Algus</Label>
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
                                        <Label>Lõpp</Label>
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

