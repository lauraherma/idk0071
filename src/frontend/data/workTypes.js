import {observable} from 'mobx';
import {DataService} from "../components/DataService";

const dataService = new DataService();
export const workTypes = observable([]);

export async function updateWorkTypes() {
    try {
        const response = await dataService.getAllWorkTypes();
        workTypes.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
