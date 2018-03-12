import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";

export class HairdresserAddTimeModal extends React.Component {
    state = {
        modal: false,
        firstName: '',
        startTime: '',
        endTime: '',
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


    addTime = () => {
        this.props.addTime({
            firstName:this.state.firstName,
            startTime:this.state.startTime,
            endTime:this.state.endTime,
        });
        this.componentDidMount();

    };

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

    render() {
        return (
            <div>
                <i onClick={this.toggle} className="fas fa-plus-circle"/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Lisa Aeg</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Kliendi nimi</Label>
                                <Input name="name"
                                       placeholder="Sisesta nimi"
                                       value={this.state.firstName}
                                       onChange={this.firstNameChanged}/>
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
                        <Button color="primary" onClick={this.addTime}>Lisa aeg</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

