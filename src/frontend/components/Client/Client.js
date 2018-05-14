import React from 'react';
import {ClientAddModal} from '../ClientAddModal/ClientAddModal';
import {NavBar} from "../NavBar/NavBar";
import {observer} from 'mobx-react';
import {clients, updateClients} from "../../data/clients";
import {ClientList} from "../ClientList/ClientList";

export const Client = observer(class Client extends React.Component {
    componentDidMount() {
        updateClients();
    }

    render() {
        return <div className="Client">
            <NavBar/>
            <br/>
            <ClientAddModal/>
            <br/>
            <ClientList clients={clients}/>

        </div>
    }

});
