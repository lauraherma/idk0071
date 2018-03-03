import React from 'react';
import "./Hairdresser.css";
import moment from "moment";
import lodash from 'lodash';

export class Hairdresser extends React.Component {
    state = {
        timeSlots: [],
    }

    componentDidMount() {
        console.log(this.props);
        const timeSlots = [];
        for (let i = 0; i < 26; i++) {
            const halfHourInMinutes = 30;
            const timeSlot = moment()
                .startOf('day')
                .set('hour', 8)
                .add(i * halfHourInMinutes, 'minute')
            timeSlots.push(timeSlot);
        }
        this.setState({
            ...this.state,
            timeSlots: timeSlots,
        });
    }

    getHairdresser() {
        return this.props.hairdresser;
    }

    getTimes() {
        const times = this.state.timeSlots.map(timeSlot => {
            const classes = ['time'];
            const isActive = this.getHairdresser()
                .appointments
                .filter(appointment => {
                    return moment()
                        .range(appointment.startTime, appointment.endTime)
                        .contains(timeSlot);
                })
                .length > 0;
            if (isActive) {
                classes.push('active');
            }
            return <div key={timeSlot} className={classes.join(' ')}>
                {timeSlot.format("HH:mm")}
            </div>
        });

        return <div className="times">
            {times}
        </div>
    }

    render() {
        return <div className="Hairdresser">
            <div className="name">
                {this.getHairdresser().name}
            </div>
            {this.getTimes()}
        </div>
    }
}
