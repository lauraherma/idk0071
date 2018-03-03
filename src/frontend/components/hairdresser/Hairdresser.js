import React from 'react';
import "./Hairdresser.css";
import moment from "moment";

export class Hairdresser extends React.Component {
    state = {
        times: [],
    }

    componentDidMount() {
        const times = [];
        for (let i = 0; i < 26; i++) {
            times.push(i);
        }
        this.setState({
            ...this.state,
            times: times,
        });

    }

    getTimes() {
        const times = this.state.times.map(time => {
            const halfHourInMinutes = 30;
            const timeslot = moment().startOf('day')
                .set('hour', 8)
                .add(time * halfHourInMinutes, 'minute');

            return <div className="time">
                {timeslot.format("HH:mm")}
            </div>
        });
        return <div className="times">
            {times}
        </div>

    }

    render() {
        return <div className="Hairdresser">
            <div className="name">
                {this.props.hairdresser.name}
            </div>
            {this.getTimes()}
        </div>
    }
}
