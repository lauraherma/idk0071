import React from "react";
import {Hairdresser} from "../hairdresser/Hairdresser";
import "./Home.css"

export class Home extends React.Component {
    state = {
        isLoading: true,
        hairdressers: [],
    };

    componentDidMount() {
        setTimeout(() => {
            const newState = {
                ...this.state,
                isLoading: false,
                hairdressers: [
                    {
                        id: 1,
                        name: "Sille",

                    },
                    {
                        id: 2,
                        name: "Minni",
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

    addHairDresser = () => {
        const hairdresser = {
            id: 3,
            name: "kati",
        };
        const newState = {
            ...this.state,
            hairdressers: [
                ...this.state.hairdressers,
                hairdresser
            ]
        }
        this.setState(newState);
    };

    render() {
        return <div className="Home">
            <h1>Juuksurid:</h1>
            {this.getLoader()}
            <div className="hairdressers">
                {this.getHairdressers()}
                <button className="btn btn-primary"
                        onClick={this.addHairDresser}>+ Lisa juuksur
                </button>
            </div>
        </div>
    }
}
