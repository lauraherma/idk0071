import React from 'react';
import {Button, Table} from 'reactstrap'
import {ClientAddModal} from '../CliendAddModal/ClientAddModal';

export class Client extends React.Component {
    state = {
        clients: [],
    };

    onClientAdded= client =>{
        const clients=[
            ...this.state.clients,
            client
        ];
        this.setState({clients:clients})
    };
    componentDidMount() {
        const clients = [
            {
                id: 1,
                firstName: 'Laura',
                lastName: 'Herma',

            },
            {
                id: 2,
                firstName: 'Yks',
                lastName: 'Kaks',

            },
        ];

        this.setState({
            clients: clients
        });

    }

    getClients() {
        return this.state.clients.map(client =>
            <tr key={client.id}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>{client.dateOfBirth}</td>
            </tr>
        );

    }


    render() {
        return <div className="Client">
            <h1>Mina olin siin :)</h1>
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
