import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Home} from "../Home/Home";
import "./App.css";


export class App extends Component {
    render() {
        return <BrowserRouter>
            <div>
                <Route path="/" component={Home}/>
            </div>
        </BrowserRouter>
    }
}
