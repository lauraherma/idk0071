import React from 'react';
import "./Hairdresser.css";

export class Hairdresser extends React.Component {
    render(){
        return <div className="Hairdresser">
            {this.props.hairdresser.name}
        </div>
    }
}
