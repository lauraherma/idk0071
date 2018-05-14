import React from 'react';
import {API_URL} from "../Constants";
import axios from 'axios';
import {updateHairdressers} from "../../data/hairdressers";

export class AllHairdressers extends React.Component {
    state = {
        hairdressers: []
    };

    formChanged = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    addHairdresser = () => {
        axios.post(API_URL + 'person/add', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            dateOfBirth: this.state.dateOfBirth,
            phone: '34554'
        }).then(() => {
            updateHairdressers();

            this.setState({
                modal: false,
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: '1990-01-01'
            });
        });
    };

    getHairdressers () {

        axios.get(API_URL + 'allHairdressers', {
            hairdressers: this.state.hairdressers,
        }).then(() => {
            console.log(this.state.hairdressers);
        });
            /* const hairdresser = this.state.hairdressers[i];

            return hairdresser ?
                <div key={hairdresser.id} className="HairdresserDailyAppointments-wrapper">
                    <HairdresserDailyAppointments hairdresser={hairdresser}/>
                </div> :
                <div key={Math.random()} className="HairdresserDailyAppointments-empty">
                    <HairdresserDailyAppointments hairdresser={emptyHairdresser}
                                 addHairdresser={this.addHairDresser}/>
                </div>;
        });*/
    }

    render() {
        return (
            <div>
                {this.getHairdressers()}
                You are here!
            </div>
        );
    }
}

