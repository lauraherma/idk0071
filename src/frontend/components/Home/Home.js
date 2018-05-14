import React from "react";
import "./Home.css"
import moment from "moment";

import {NavBar} from "../NavBar/NavBar";
import {updateWorkTypes} from "../../data/workTypes";
import {hairdressers, updateHairdressers} from "../../data/hairdressers";
import {updateColorCards} from "../../data/colorCards";
import {DailyHairdressers} from "../DailyHairdressers/DailyHairdressers";

export class Home extends React.Component {
    state = {
        sidebarOpen: false,
    };

    componentDidMount() {
        updateWorkTypes();
        updateHairdressers();
        updateColorCards();
    }


    render() {
        return (
            <div className="Home">
                <NavBar/>
                <div className="container">
                <h4>{moment().format('MMMM Do YYYY')}</h4>
                <DailyHairdressers hairdressers={hairdressers}/>
                </div>

            </div>
        );
    }
}
