import React from 'react';
import "./Hairdresser.css";
import moment from "moment";
import {HairdresserAddModal} from "../HairdresserAddModal/HairdresserAddModal";
import {HairdresserAddTimeModal} from "../HairdresserAddTimeModal/HairdresserAddTimeModal";
import lodash from "lodash";
import axios from "axios/index";
import {API_URL} from "../Constants";

export class Hairdresser extends React.Component {
    state = {
        timeSlots: [],
        allWorks: []
    };
    addTime = (form) => {
        this.getHairdresser().appointments.push({
            id: Math.random(),
            startTime: moment(form.startTime),
            endTime: moment(form.endTime),
            description: "",
            client: form.client,
        });
        this.createTimeSlots();
    };

    componentDidMount() {
        this.createTimeSlots();
        let tempWorks = [];
        axios.get(API_URL + 'workTypes')
            .then(function(response){
                tempWorks.push(response.data[0].name);

                this.setState({
                    allWorks: tempWorks,
                })
            });
    }

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
                const appointmentInfo = appointment ?
                    appointment.client.firstName :
                    "";

                const appointmentElement = appointment ?
                    <span onClick={removeAppointment}>{appointmentInfo}</span> :
                    <HairdresserAddTimeModal timeSlot={timeSlot}
                                             allWorks={this.state.allWorks}
                                             addTime={this.addTime}/>

                const timeFormat = appointment ?
                    appointment.startTime.format("HH:mm") + "-" + appointment.endTime.clone().startOf("minute").add(1, 'minute').format("HH:mm") :
                    timeSlot.format("HH:mm");

                return <div key={timeSlot} className={classes.join(' ')}>
                    {timeFormat}
                    {appointmentElement}
                </div>
            });

        return <div className="times">
            {times}
        </div>
    }

    render() {
        const header = this.getHairdresser().id ?
            this.getHairdresser().name :
            <HairdresserAddModal onHairdresserAdded={this.props.onHairdresserAdded}/>;

        return <div className="Hairdresser">
            <div className="name">
                {header}
            </div>

            {this.getTimes()}
        </div>;
    }
}
