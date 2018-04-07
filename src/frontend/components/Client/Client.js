import React from 'react';
import {Button, Table} from 'reactstrap'
import {ClientAddModal} from '../ClientAddModal/ClientAddModal';
import {DataService} from "../DataService";

export class Client extends React.Component {

    dataService = new DataService();

    state = {
        clients: [],
    };

    onClientAdded = () =>{
        this.loadClients();
    };

    loadClients() {
        this.dataService.getAllClients().then(response => {
            this.setState({
                clients: response.data,
            });
        });
    }

    componentDidMount() {
        this.loadClients();
    }

    getClients() {
        return this.state.clients.map(client =>
            <tr key={client.person.id}>
                <td>{client.person.firstName}</td>
                <td>{client.person.lastName}</td>
                <td>{client.person.phone}</td>
                <td>{client.person.email}</td>
                <td>{client.person.dateOfBirth}</td>
            </tr>
        );

    }


    render() {
        return <div className="Client">
            <ClientAddModal onClientAdded={this.onClientAdded}/>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date of birth</th>
                </tr>
                </thead>
                <tbody>
                {this.getClients()}
                </tbody>
            </Table>
        </div>
    }

}
