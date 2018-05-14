import React from "react";
import "./Home.css"
import moment from "moment";

import {NavBar} from "../NavBar/NavBar";
import {updateWorkTypes} from "../../data/workTypes";
import {hairdressers, updateHairdressers} from "../../data/hairdressers";
import {DailyHairdressers} from "../DailyHairdressers/DailyHairdressers";
import {updateHydrogens} from "../../data/hydrogens";
import {updateColors} from "../../data/colors";

export class Home extends React.Component {
    state = {
        sidebarOpen: false,
    };

    componentDidMount() {
        updateWorkTypes();
        updateHairdressers();
        updateColors();
        updateHydrogens();
    }


    render() {
        return (
            <div className="Home">
                <NavBar/>
                <h2>{moment().format('MMMM Do YYYY')}</h2>
                <DailyHairdressers hairdressers={hairdressers}/>

            </div>
        );
    }
}
