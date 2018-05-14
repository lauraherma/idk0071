import {observable} from 'mobx';
import {DataService} from "../components/DataService";

const dataService = new DataService();
export const hydrogens = observable([]);

export async function updateHydrogens() {
    try {
        const response = await dataService.getHydrogens();
        hydrogens.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
