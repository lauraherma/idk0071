import React from 'react';
import {observer} from 'mobx-react';
import {Button, Table} from 'reactstrap'


export const ClientList = observer(class ClientList extends React.Component {


        getClients() {
            return this.props.clients.map(client =>
                <tr key={client.person.id}>
                    <td>{client.person.firstName}</td>
                    <td>{client.person.lastName}</td>
                    <td>{client.person.phone}</td>
                    <td>{client.person.email}</td>
                    <td>{client.person.dateOfBirth}</td>
                </tr>
            );

        };

        render() {
            return <div>
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
)
