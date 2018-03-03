import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Home} from "./components/home/Home";


export class App extends Component {
    render() {
        return <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
            </div>
        </BrowserRouter>
    }
}
