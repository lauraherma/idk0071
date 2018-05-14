import React from 'react';
import {observer} from 'mobx-react';
import {Button, Table} from 'reactstrap'
import {workTypes} from "../../data/workTypes";
import {ClientAddModal} from "../ClientAddModal/ClientAddModal";

const initialState = {
    isAddClientOpen: false,
    activeClientId: undefined,
};

export const ClientList = observer(class ClientList extends React.Component {
    state = { ...initialState };

    getClients() {
        return this.props.clients.filter(client => client).map(client =>
            <tr style={{
                cursor: 'pointer'
            }} onClick={() => this.openClient(client)} key={client.person.id}>
                <td>
                    <ClientAddModal
                        client={client}
                        close={() => this.closeModals()}
                        isOpened={this.state.activeClientId === client.person.id}/>
                    {client.person.firstName}
                </td>
                <td>{client.person.lastName}</td>
                <td>{client.person.phone}</td>
                <td>{client.person.email}</td>
                <td>{client.person.dateOfBirth}</td>
            </tr>
        );

    };

    openClient(client) {
        this.setState({ activeClientId: client.person.id });
    }

    closeModals () {
        this.setState({
            isAddClientOpen: false,
            activeClientId: undefined
        });
    }

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

            <Button onClick={() => this.setState({isAddClientOpen: true})}>
                + Add client
                <ClientAddModal
                    close={() => this.closeModals()}
                    isOpened={this.state.isAddClientOpen}/>
            </Button>
        </div>
    }
});
