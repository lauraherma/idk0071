import {observable} from 'mobx';
import {DataService} from "../components/DataService";

const dataService = new DataService();
export const clients = observable([]);

export async function updateClients() {
    try {
        const response = await dataService.getClients();
        clients.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
