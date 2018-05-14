import {observable} from 'mobx';
import {DataService} from "../components/DataService";

const dataService = new DataService();
export const colorCards = observable([]);

export async function updateColorCards() {
    try {
        const response = await dataService.getColorCards();
        colorCards.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
