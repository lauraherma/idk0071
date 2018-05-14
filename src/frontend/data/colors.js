import {observable} from 'mobx';
import {DataService} from "../components/DataService";

const dataService = new DataService();
export const colors = observable([]);

export async function updateColors() {
    try {
        // const response = await dataService.getColors();
        // colors.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
