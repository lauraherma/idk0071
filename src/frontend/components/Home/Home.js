import React from "react";
import {Hairdresser} from "../Hairdresser/Hairdresser";
import "./Home.css"
import moment from "moment";
import lodash from "lodash";

export class Home extends React.Component {
    state = {
        isLoading: true,
        sidebarOpen : false,
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
                                startTime: moment().startOf('day').add(10,'hour'),
                                endTime: moment().startOf('day').add(12,'hour'),
                                description: 'Värv lõikus soeng',
                                name:'Laura'
                            },
                            {
                                id: 12,
                                startTime: moment().startOf('day').add(14,'hour'),
                                endTime: moment().startOf('day').add(15,'hour'),
                                description: 'Värv lõikus soeng',
                                name:'Triinu',
                            },
                        ]
                    },
                    {
                        id: 2,
                        name: "Minni",
                        appointments: [{
                            id: 12,
                            startTime: moment().startOf('day').add(17,'hour'),
                            endTime: moment().startOf('day').add(19,'hour'),
                            description: 'Värv lõikus soeng',
                            name:'Laura',
                        }

                        ]
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

    getHairdressers () {
        return lodash.times(6, i => {
            const hairdresser = this.state.hairdressers[i];
            const emptyHairdresser = {
                name: '+ Lisa juuksur',
                appointments: []
            };

            return hairdresser ?
                <div key={hairdresser.id} className="Hairdresser-wrapper">
                    <Hairdresser hairdresser={hairdresser}/>
                </div> :
                <div key={Math.random()} className="Hairdresser-empty">
                    <Hairdresser hairdresser={emptyHairdresser}
                                 onHairdresserAdded={this.addHairDresser}/>
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
        return (
            <div className="Home">

            <h1>{moment().format('MMMM Do YYYY')}</h1>
            {this.getLoader()}
            <div className="hairdressers">
                {this.getHairdressers()}
            </div>
        </div>
        );
    }
}
