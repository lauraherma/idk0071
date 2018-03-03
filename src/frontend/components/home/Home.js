import React from "react";
import {Hairdresser} from "../hairdresser/Hairdresser";

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
        }, 1000);
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

    render() {
        return <div className="Home">
            <h1>Juuksurid:</h1>
            {this.getLoader()}
            {this.getHairdressers()}
        </div>
    }
}
