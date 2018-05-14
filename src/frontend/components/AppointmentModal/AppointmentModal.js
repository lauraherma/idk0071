import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Row, Col} from 'reactstrap';
import moment from "moment";
import lodash from 'lodash';
import {AddWorkTypeButton} from "../AddWorkTypeButton/AddWorkTypeButton";
import {AddHydrogenButton} from "../AddHydrogenButton/AddHydrogenButton";
import {AddColorButton} from "../AddColorButton/AddColorButton"
import {DataService} from "../DataService";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {ColorRecipe} from "../ColorRecipe/ColorRecipe";
import {observer} from 'mobx-react';
import {updateHairdressers} from "../../data/hairdressers";
import {updateWorkTypes} from "../../data/workTypes";
import {updateColors} from "../../data/colors";
import {updateHydrogens} from "../../data/hydrogens";
import {openAppointment, setOpenAppointment} from "../../data/openAppointment";

const initialState = {
    isLoading: false,
    modal: false,
    firstName: '',
    lastName: '',
    startTime: '',
    endTime: '',
    description: '',
    price: '',
    hairdresser: '',
    client: '',
    work: '',
    allClients: [],
    allWorks: [],
    checkedWorkTypeIds: [],
    options: [],
    optionKey: '',
    colorCode: '',
    colorAmount: '',
    colorCompanyName: '',
    hydrogenName: '',
    hydrogenAmount: '',
    hydrogenCompanyName: '',
    colorRecipe: [
        {
            id: 1,
            date: '',
            colors: [
                {
                    id: 1,
                    code: 'Red',
                    amount: 0,
                    companyName: 'Sebastian'
                },
            ],
            hydrogens: [
                {
                    id: 1,
                    name: '6%',
                    amount: 2,
                    companyName: ''
                },
            ]
        },
    ],
};

export const AppointmentModal = observer(class extends React.Component {
    dataService = new DataService();

    state = {...initialState};

    colorCode = '';
    colorAmount = '';
    colorCompanyName = '';
    hydrogenName = '';
    hydrogenAmount = '';
    hydrogenCompanyName = '';

    componentDidMount() {
        this.setState({
            modal: this.props.isOpened,

        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modal: nextProps.isOpened});

        if (nextProps.isOpened) {
            this.setState({
                ...initialState,
                modal: nextProps.isOpened,
            });

            if (this.props.appointment) {
                setOpenAppointment(this.props.appointment);
                this.setStateFromAppointment();
            } else {
                setOpenAppointment({});
                this.setStateFromEmptyAppointment();
            }
        }
    }

    setStateFromAppointment = () => {
        const appointment = this.props.appointment;
        const workTypes = this.getWorkTypes();

        this.state.colorCode = this.colorCode;
        this.state.colorAmount = this.colorAmount;
        this.state.colorCompanyName = this.colorCompanyName;
        this.state.hydrogenName = this.hydrogenName;
        this.state.hydrogenAmount = this.hydrogenAmount;
        this.state.hydrogenCompanyName = this.hydrogenCompanyName;

        const appointmentInfo = {
            firstName: appointment.client.firstName,
            checkedWorkTypeIds: workTypes.map(workType => workType.id),
            description: appointment.description,
            price: appointment.price || "",
            startTime: this.getAppointmentStartEndTime(appointment).startTime.format(),
            endTime: this.getAppointmentStartEndTime(appointment).endTime.add(1, 'second').format(),
            colorRecipe: [
                {
                    id: 1,
                    date: '',
                    colors: [
                        {
                            id: 1,
                            code: this.state.colorCode,
                            amount: this.state.colorAmount,
                            companyName: this.state.colorCompanyName
                        },
                    ],
                    hydrogens: [
                        {
                            id: 1,
                            name: this.state.hydrogenName,
                            amount: this.state.hydrogenAmount,
                            companyName: this.state.hydrogenCompanyName
                        },
                    ]
                },
            ],

        };
        console.log(this.state);

        this.setState({...appointmentInfo});
    };

    setStateFromEmptyAppointment = () => {
        this.setState({
            startTime: this.props.timeSlot.format(),
            endTime: this.props.timeSlot.clone().add(90, 'minutes').format(),
        });
    };

    getWorkTypes = () => {
        return this.props.appointment && this.props.appointment.work.workTypes.peek();
    };

    getAppointmentStartEndTime = (appointment) => {
        return {
            startTime: moment.utc(appointment.startTime).local(),
            endTime: moment.utc(appointment.endTime).local(),
        };
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

    colorCodeChanged = (event) => {
        this.setState({
            colorCode: event.target.value,
        })
    };

    colorAmountChanged = (event) => {
        this.setState({
            colorAmount: event.target.value,
        })
    };

    colorCompanyChanged = (event) => {
        this.setState({
            colorCompanyName: event.target.value,
        })
    };

    hydrogenNameChanged = (event) => {
        this.setState({
            hydrogenName: event.target.value,
        })
    };

    hydrogenAmountChanged = (event) => {
        this.setState({
            hydrogenAmount: event.target.value,
        })
    };

    hydrogenCompanyChanged = (event) => {
        this.setState({
            hydrogenCompanyName: event.target.value,
        })
    };

    clientChanged = (event) => {
        this.setState({
            client: event[0],
        });
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
        const id = Number(event.target.value);

        if (event.target.checked) {
            this.setState({
                checkedWorkTypeIds: [...this.state.checkedWorkTypeIds, id]
            })
        }
        else {
            this.setState({
                checkedWorkTypeIds: lodash.without(this.state.checkedWorkTypeIds, id)
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

    removeAppointment = () => {

        this.dataService.removeAppointment(this.props.appointment.id).then(() => {
            updateHairdressers();
            updateColors();
            updateHydrogens();
            this.setState({...initialState});
        });
    };

    addAppointment = () => {

        const newAppointment = {
            startTime: moment(this.state.startTime),
            endTime: moment(this.state.endTime).subtract(1, 'second'),
            price: this.state.price,
            description: this.state.description,
            hairdresser: this.props.hairdresser,
            client: this.state.client,
            work: {
                workTypes: this.state.checkedWorkTypeIds.map(
                    id => this.props.workTypes.find(workType => workType.id === id)
                ),
            },
            colorRecipe: [
                {
                    colors: [
                        {
                            code: this.state.colorCode,
                            amount: this.state.colorAmount,
                            companyName: this.state.colorCompanyName
                        },
                    ],
                    hydrogens: [
                        {
                            name: this.state.hydrogenName,
                            amount: this.state.hydrogenAmount,
                            companyName: this.state.hydrogenCompanyName
                        },
                    ]
                },
            ],
        };

        if (this.props.appointment) {
            newAppointment.id = this.props.appointment.id;
            if (newAppointment.client === '') {
                newAppointment.client = this.props.appointment.client;
            }
        }

        this.colorCode = this.state.colorCode;
        this.colorAmount = this.state.colorAmount;
        this.colorCompanyName = this.state.colorCompanyName;
        this.hydrogenName = this.state.hydrogenName;
        this.hydrogenAmount = this.state.hydrogenAmount;
        this.hydrogenCompanyName = this.state.hydrogenCompanyName;

        this.dataService.addAppointment(newAppointment).then(() => {
            updateHairdressers();
            updateColors();
            updateHydrogens();
            console.log(this.state);
        });
    };

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

    getWorkTypesCheckboxes() {
        return this.props.workTypes.map(workType => {
            const isChecked = this.state.checkedWorkTypeIds.includes(workType.id);
            return <FormGroup key={workType.id} check inline>
                <Label check>
                    <Input checked={isChecked} type="checkbox" value={workType.id} onChange={this.workTypeChanged}/>
                    {workType.name}
                </Label>
            </FormGroup>
        });
    }

    addWorkType = () => {
        updateWorkTypes();
    };

    addColor = () => {
        updateColors();
    };

    addHydrogen = () => {
        updateHydrogens();
    };

    _handleSearch = (name) => {
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
        const appointment = this.props.appointment;

        const modalTitle = appointment ? 'Muuda aega' : `Lisa aeg juuksurile`;

        const appointmentLabel = appointment ?
            <span>
                {this.props.appointment.client.person.firstName}
                <br/>
                {this.getWorkTypes().map(workType => workType.name).join(", ")}
            </span> :
            <i onClick={this.toggle} className="fas fa-plus-circle"/>;

        const buttonGroup = appointment ?
            <div>
                <Button color="danger" onClick={this.removeAppointment}>Kustuta</Button>
                <Button color="primary" onClick={this.addAppointment}>Muuda</Button>
            </div> :
            <Button color="primary" onClick={this.addAppointment}>Lisa</Button>;


        const colorRecipe = this.state.checkedWorkTypeIds.includes(3) ?
            <FormGroup>
                <div className="ColorRecipe">
                    <h4>Värvikaart</h4>

                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <Label>Värvi firma</Label>
                                <Input type="text" placeholder="Sisesta värvi firma"
                                       onChange={this.colorCompanyChanged}
                                       value={this.state.colorCompanyName}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <Input type="text"
                                       placeholder="Sisesta värvikood"
                                       onChange={this.colorCodeChanged}
                                       value={this.state.colorCode}/>
                            </FormGroup>
                        </Col>

                        <Col sm={4}>
                            <FormGroup>
                                <Input type="text"
                                       placeholder="Sisesta värvi grammid"
                                       onChange={this.colorAmountChanged}
                                       value={this.state.colorAmount}/>
                            </FormGroup>
                        </Col>

                        <Col sm={4}>
                            <FormGroup>

                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <Label>Vesiniku firma</Label>
                                <Input type="text" placeholder="Sisesta vesiniku firma"
                                       onChange={this.hydrogenCompanyChanged}
                                       value={this.state.hydrogenCompanyName}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <Input type="text"
                                       placeholder="Sisesta nimi"
                                       onChange={this.hydrogenNameChanged}
                                       value={this.state.hydrogenName}/>
                            </FormGroup>
                        </Col>

                        <Col sm={4}>
                            <FormGroup>
                                <Input type="text"
                                       placeholder="Sisesta kogus grammides"
                                       onChange={this.hydrogenAmountChanged}
                                       value={this.state.hydrogenAmount}/>
                            </FormGroup>
                        </Col>

                        <Col sm={4}>
                            <FormGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button onClick={() => this.addColorRecipe()} color="primary" block>
                        Lisa uus värviretsept
                    </Button>
                </div>
            </FormGroup>
             : "";


        /*{this.getColorCards().map(colorCards => colorCards.name)}*/

        const nameInput = appointment ?
            <h3> {appointment.client.person.firstName + ' ' + appointment.client.person.lastName}</h3> :
            <FormGroup>
                <div>
                    <AsyncTypeahead
                        labelKey="label"
                        minLength={2}
                        value={this.state.client}
                        onSearch={this._handleSearch}
                        onChange={this.clientChanged}
                        isLoading={this.state.isLoading}
                        placeholder="Sisesta nimi"
                        options={this.state.options}
                    />
                </div>
            </FormGroup>

        return (
            <div>
                <span>{appointmentLabel}</span>
                <Modal size="lg"
                       onClosed={() => this.props.onModalClosed()}
                       isOpen={this.state.modal}
                       toggle={this.toggle}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
                    <ModalBody>
                        <Form>
                            {nameInput}
                            <FormGroup>
                                <div>Teenused</div>
                                {this.getWorkTypesCheckboxes()}
                                <AddWorkTypeButton addWorkType={this.addWorkType}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Kommentaar</Label>
                                <Input name="description"
                                       placeholder="Sisesta kommentaar"
                                       value={this.state.description}
                                       onChange={this.formChanged}/>
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
                            {colorRecipe}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={this.toggle}>Cancel</Button>
                        {buttonGroup}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
});
