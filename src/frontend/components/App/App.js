import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Home} from "../Home/Home";
import {Client} from "../Client/Client";
import "./App.css";


export class App extends Component {
    render() {
        return <BrowserRouter>
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/clients" component={Client}/>
            </div>
        </BrowserRouter>
    }
}
