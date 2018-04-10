import React from 'react';
import "./HairdresserDailyAppointments.css";
import moment from "moment";
import {HairdresserAddModal} from "../HairdresserAddModal/HairdresserAddModal";
import lodash from "lodash";
import {AppointmentModal} from "../AppointmentModal/AppointmentModal";
import {workTypes} from "../../data/workTypes";

export class HairdresserDailyAppointments extends React.Component {
    state = {
        timeSlotOpened: '',
        timeSlots: [],
        allWorks: []
    };

    createTimeSlots = () => {
        const timeSlots = [];
        for (let i = 0; i < 26; i++) {
            const halfHourInMinutes = 30;
            const timeSlot = moment()
                .startOf('day')
                .set('hour', 8)
                .add(i * halfHourInMinutes, 'minute');

            const appointment = this.getAppointmentOnTimeSlot(timeSlot);

            if (appointment) {
                const {startTime, endTime} = this.getAppointmentStartEndTime(appointment);
                const isStartTime = appointment && startTime.format() === timeSlot.format();
                const isEndTime = appointment && endTime.format() === timeSlot.format();

                if (isStartTime || isEndTime) {
                    timeSlots.push(timeSlot);
                }
            } else {
                timeSlots.push(timeSlot);
            }
        }
        this.setState({
            timeSlots: timeSlots,
        });
    };


    componentDidMount() {
        this.createTimeSlots();
    }

    getHairdresser = () => {
        return this.props.hairdresser;
    };

    getAppointments = () => {
        return this.getHairdresser() ? this.getHairdresser().appointments.peek() : [];
    };

    getAppointmentOnTimeSlot = (timeSlot) => {
        return this.getAppointments().filter(appointment => {
            const {startTime, endTime} = this.getAppointmentStartEndTime(appointment);

            return moment()
                .range(startTime, endTime)
                .contains(timeSlot);
        })[0];
    };

    getTimeSlotTimeFormatLabel = (appointment, timeSlot) => {
        if (appointment) {
            const {startTime, endTime} = this.getAppointmentStartEndTime(appointment);
            return startTime.format("HH:mm") + "-" + endTime.add(1, 'second').format("HH:mm");
        } else {
            return timeSlot.format("HH:mm");
        }
    };

    getTimes = () => {

        let alreadyAppearedAppointments = [];

        const timeSlot = this.state.timeSlots.map(timeSlot => {
            const appointment = this.getAppointment(timeSlot);
            const appointmentClasses = this.getAppointmentClasses(appointment);

            const timeFormat = this.getTimeSlotTimeFormatLabel(appointment, timeSlot);

            if (appointment) {
                if (alreadyAppearedAppointments.includes(appointment.id)) {
                    return;
                }
                alreadyAppearedAppointments.push(appointment.id)
            }

            return <div onClick={() => this.openTimeSlot(timeSlot)}
                        key={timeSlot}
                        className={appointmentClasses.join(' ')}>
                {timeFormat}
                <AppointmentModal appointment={appointment}
                                  workTypes={workTypes}
                                  hairdresser={this.getHairdresser()}
                                  timeSlot={timeSlot}
                                  isOpened={timeSlot === this.state.timeSlotOpened}
                                  onModalClosed={() => this.setState({ timeSlotOpened: '' })}
                                  changeAppointment={(changedAppointment) => this.changeAppointment(changedAppointment, changedAppointment)}/>
            </div>
        });

        return <div className="times">
            {timeSlot}
        </div>
    };

    getAppointmentClasses = (appointment) => {
        const classes = ['time'];
        if (appointment) {
            classes.push('active');

            const {startTime, endTime} = this.getAppointmentStartEndTime(appointment);
            const appointmentDurationInMinutes = Math.round((startTime - endTime) / 1000 / 60);
            classes.push('minutes-' + Math.abs(appointmentDurationInMinutes));
        }
        return classes;
    };

    getAppointment = (timeSlot) => {
        return this.getAppointments().filter(appointment => {
            const {startTime, endTime} = this.getAppointmentStartEndTime(appointment);

            return moment()
                .range(startTime, endTime)
                .contains(timeSlot);
        })[0];
    };

    getAppointmentStartEndTime = (appointment) => {
        return {
            startTime: moment.utc(appointment.startTime).local(),
            endTime: moment.utc(appointment.endTime).local(),
        };
    };

    openTimeSlot = (timeSlot) => {
        this.setState({
            timeSlotOpened: timeSlot,
        });
    };

    changeAppointment = (appointment, changedAppointment) => {
        lodash.extend(appointment, changedAppointment);
        this.createTimeSlots();
    };

    render() {
        const header = this.getHairdresser() ?
            this.getHairdresser().person.firstName :
            <HairdresserAddModal/>;

        return <div className="Hairdresser">
            <div className="name">
                {header}
            </div>

            {this.getTimes()}
        </div>;
    }
}
