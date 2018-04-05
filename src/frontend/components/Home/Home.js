import React from "react";
import {Hairdresser} from "../Hairdresser/Hairdresser";
import "./Home.css"
import moment from "moment";
import lodash from "lodash";
import {DataService} from "../DataService";

export class Home extends React.Component {

    dataService = new DataService();

    state = {
        isLoading: true,
        sidebarOpen: false,
        hairdressers: [],
    };

    componentDidMount() {

        const newState = {
            isLoading: false,
        };
        this.loadHairdressers();
        this.setState(newState);
    }


    getLoader() {
        return this.state.isLoading ?
            <div>Loading...</div> :
            null;
    }

    loadHairdressers() {
        this.dataService.getHairdressers().then(response => {
            this.setState({
                hairdressers: response.data,
            });
        });
    }

    getHairdressers() {
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
                                 addHairdresser={this.addHairDresser}/>
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
