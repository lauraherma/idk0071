import React from 'react';
import "./HairdresserDailyAppointments.css";
import moment from "moment";
import {HairdresserAddModal} from "../HairdresserAddModal/HairdresserAddModal";
import lodash from "lodash";
import axios from "axios/index";
import {API_URL} from "../Constants";
import {DataService} from "../DataService";
import {AppointmentModal} from "../AppointmentModal/AppointmentModal";

export class HairdresserDailyAppointments extends React.Component {

    dataService = new DataService();

    state = {
        timeSlotOpened: '',
        timeSlots: [],
        allWorks: []
    };

    addTime = (form) => {
        this.getHairdresser().appointments.push(form);
        this.createTimeSlots();
    };

    createTimeSlots() {
        const timeSlots = [];
        for (let i = 0; i < 26; i++) {
            const halfHourInMinutes = 30;
            const timeSlot = moment()
                .startOf('day')
                .set('hour', 8)
                .add(i * halfHourInMinutes, 'minute');

            const appointmentOnTimeSlot = this.getAppointmentOnTimeSlot(timeSlot);
            const isStartTime = appointmentOnTimeSlot && timeSlot.format() === moment(appointmentOnTimeSlot.startTime).format();
            const isEndTime = appointmentOnTimeSlot && timeSlot.format() === moment(appointmentOnTimeSlot.endTime).format();

            if (!appointmentOnTimeSlot || (appointmentOnTimeSlot && isStartTime) || (appointmentOnTimeSlot && isEndTime)) {
                timeSlots.push(timeSlot);
            }
        }
        this.setState({
            timeSlots: timeSlots,
        });
    }


    componentDidMount() {
        this.createTimeSlots();
    }

    getHairdresser() {
        return this.props.hairdresser;
    }

    getAppointmentOnTimeSlot(timeSlot) {
        return this.getHairdresser()
            .appointments
            .filter(appointment => {
                return moment()
                    .range(appointment.startTime, appointment.endTime)
                    .contains(timeSlot);
            })[0];
    }


    getTimes() {
        const
            times = this.state.timeSlots.map(timeSlot => {
                const classes = ['time'];
                const appointment = this.getHairdresser()
                    .appointments
                    .filter(appointment => {
                        appointment.startTime = moment(appointment.startTime);
                        appointment.endTime = moment(appointment.endTime);
                        return moment()
                            .range(appointment.startTime, appointment.endTime)
                            .contains(timeSlot);
                    })[0];
                if (appointment) {
                    classes.push('active');
                    const appointmentDurationInMinutes = Math.round(
                        (appointment.endTime.clone().utc() - appointment.startTime.clone().utc()) / 1000 / 60
                    );
                    classes.push('minutes-' + appointmentDurationInMinutes);
                }

                const removeAppointment = () => {
                    lodash.remove(this.getHairdresser().appointments, appointment);
                    this.createTimeSlots();
                };


                const openTimeSlot = () => {
                    this.setState({
                        timeSlotOpened: timeSlot,
                    });
                };

                const changeAppointment = (changedAppointment) => {
                    lodash.extend(appointment, changedAppointment);
                    this.createTimeSlots();
                };

                const timeFormat = appointment ?
                    appointment.startTime.format("HH:mm") + "-" + appointment.endTime.clone().startOf("minute").add(1, 'minute').format("HH:mm") :
                    timeSlot.format("HH:mm");

                return <div onClick={openTimeSlot} key={timeSlot} className={classes.join(' ')}>
                    {timeFormat}
                    <AppointmentModal appointment={appointment}
                                      hairdresser={this.getHairdresser()}
                                      timeSlot={timeSlot}
                                      isOpened={timeSlot === this.state.timeSlotOpened}
                                      removeAppointment={removeAppointment}
                                      addTime={this.addTime}
                                      changeAppointment={changeAppointment}/>
                </div>
            });

        return <div className="times">
            {times}
        </div>
    }

    render() {
        const header = this.getHairdresser().id ?
            this.getHairdresser().person.firstName :
            <HairdresserAddModal addHairdresser={this.props.addHairdresser}/>;

        return <div className="Hairdresser">
            <div className="name">
                {header}
            </div>

            {this.getTimes()}
        </div>;
    }
}
