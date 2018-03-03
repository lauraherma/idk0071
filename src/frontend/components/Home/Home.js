import React from "react";
import {Hairdresser} from "../Hairdresser/Hairdresser";
import "./Home.css"
import {HairdresserAddModal} from "../HairdresserAddModal/HairdresserAddModal";

export class Home extends React.Component {
    state = {
        isLoading: true,
        hairdressers: [],
    };

    componentDidMount() {
        setTimeout(() => {
            const newState = {
                isLoading: false,
                hairdressers: [
                    {
                        id: 1,
                        name: "Sille",
                        appointments: [
                            {
                                id: 11,
                                startTime: '2018-03-03T10:30:00+02:00',
                                endTime: '2018-03-03T13:30:00+02:00',
                                description: 'Värv lõikus soeng',
                            },
                            {
                                id: 12,
                                startTime: '2018-03-03T15:30:00+02:00',
                                endTime: '2018-03-03T16:00:00+02:00',
                                description: 'Värv lõikus soeng',
                            },
                        ]
                    },
                    {
                        id: 2,
                        name: "Minni",
                        appointments: []
                    }
                ]
            };
            this.setState(newState);
        }, 100);
    }

    getLoader() {
        return this.state.isLoading ?
            <div>Loading...</div> :
            null;
    }


    getHairdressers() {
        return this.state.hairdressers.map(hairdresser => {
            return <Hairdresser key={hairdresser.id}
                                hairdresser={hairdresser}/>
        })
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
        return <div className="Home">
            <h1>Juuksurid:</h1>
            {this.getLoader()}
            <div className="hairdressers">
                {this.getHairdressers()}
                <HairdresserAddModal addHairdresser={this.addHairDresser}/>
            </div>
        </div>
    }
}
