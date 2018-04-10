import {observable} from 'mobx';
import {DataService} from "../components/DataService";

const dataService = new DataService();
export const hairdressers = observable([]);

export async function updateHairdressers() {
    try {
        const response = await dataService.getHairdressers();
        hairdressers.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
