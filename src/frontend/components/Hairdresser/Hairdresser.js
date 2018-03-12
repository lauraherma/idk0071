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
            name: form.firstName,
        });
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
            timeSlots.push(timeSlot);
        }
        this.setState({
            timeSlots: timeSlots,
        });
    }


    componentDidMount() {
        this.createTimeSlots();
        let tempWorks = [];
        axios.get(API_URL + 'workTypes')
            .then(function(response){
                tempWorks.push(response.data[0].name);
            }).then(this.setState({
            allWorks: tempWorks,
        }));
    }

    getHairdresser() {
        return this.props.hairdresser;
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
                }
                const removeAppointment = () => {
                    lodash.remove(this.getHairdresser().appointments, appointment);
                    this.createTimeSlots();
                };
                const appointmentElement = appointment ?
                    <span onClick={removeAppointment}>{appointment.name}</span> :
                    <HairdresserAddTimeModal timeSlot={timeSlot}
                                             allWorks={this.state.allWorks}
                                             addTime={this.addTime}/>

                return <div key={timeSlot} className={classes.join(' ')}>
                    {timeSlot.format("HH:mm")}
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
            <HairdresserAddModal addHairdresser={this.props.addHairdresser}/>;

        return <div className="Hairdresser">
            <div className="name">
                {header}
            </div>

            {this.getTimes()}
        </div>;
    }
}
