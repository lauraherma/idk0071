import React from 'react';
import lodash from "lodash";
import {HairdresserDailyAppointments} from "../HairdresserDailyAppointments/HairdresserDailyAppointments";
import './DailyHairdressers.css';
import {observer} from 'mobx-react';

export const DailyHairdressers = observer(class extends React.Component {
    getHairdressers() {
        return lodash.times(6, i => {
            const hairdresser = this.props.hairdressers.find((hairdresser, index) => index === i);

            return hairdresser ?
                <div key={hairdresser.id} className="Hairdresser-wrapper">
                    <HairdresserDailyAppointments hairdresser={hairdresser}/>
                </div> :
                <div style={{ cursor: 'pointer' }} key={Math.random()} className="Hairdresser-empty">
                    <HairdresserDailyAppointments onHairdresserAdded={this.addHairDresser}/>
                </div>;
        });
    }

    addHairDresser = (hairdresser) => {
        const newHairdresser = {
            id: Math.random(),
            name: hairdresser.firstName,
            appointments: []
        };
        const newState = {
            hairdressers: [
                ...this.state.hairdressers,
                newHairdresser
            ]
        };
        this.setState(newState);
    };

    render() {
        return <div className="DailyHairdressers">
            {this.getHairdressers()}
        </div>
    }
});
