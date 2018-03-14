import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";
import {DataService} from "../DataService";
import {AsyncTypeahead} from "react-bootstrap-typeahead";


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
            modal: false
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
        const form = this.state.appointmentForm;
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
                                <Input name="description"
                                       placeholder="Kirjeldus"
                                       value={form.description}
                                       onChange={this.formChanged}/>
                                <Label>Töö liik</Label>
                                <select name="work"
                                        value={form.work}
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
                                                value={form.startTime}
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
                                                value={form.endTime}
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
