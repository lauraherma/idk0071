import axios from "axios/index";
import {API_URL} from "./Constants";

export class DataService  {

    getRequest(...urlParts) {
        let url = urlParts.join('/');
        return axios.get(API_URL + url)
    }

    postRequest(data, ...urlParts) {
        let url = urlParts.join('/');
        return axios.post(API_URL + url, data)
    }

    addWorkType(data) {
        return this.postRequest(data, 'work-type', 'add')
    }

    addPerson(data) {
        return this.postRequest(data, 'person', 'add');
    }

    addRole(data) {
        return this.postRequest(data, 'role', 'add');
    }

    addAppointment(data) {
        return this.postRequest(data, 'appointment', 'add');
    }

    addColor(data) {
        return this.postRequest(data, 'color', 'add');
    }

    addHydrogen(data) {
        return this.postRequest(data, 'hydrogen', 'add');
    }

    removeAppointment(id) {
        return this.getRequest('appointment', 'remove', id);
    }

    removeRole(id) {
        return this.getRequest('role', 'remove', id);
    }


    getClients(name) {
        return this.getRequest('roles', 'clients', name);
    }

    getAllClients() {
        return this.getRequest('roles', 'clients');
    }

    getRoleTypeByName(name) {
        return this.getRequest('role-type', name)
    }

    getAppointmentsByClientId(id) {
        return this.getRequest('appointments', id)
    }

    getHairdressers() {
        return this.getRequest('roles','hairdressers');
    }

    getAllWorkTypes() {
        return this.getRequest('work-types');
    }

    getColorCards() {
        return this.getRequest('color-cards');
    }

    addColorRecipeToAppointment(data) {
        // TODO API
        return {
            id: Math.random(),
            date: '',
            colors: [{}],
            hydrogens: [{}],
        };
    }

    addColorToColorRecipe(data) {
        // TODO API: Oleks vaja tagastada kõik recipe colorid
        // return this.postRequest(data, `appointment/${data.appointmentId}/color-recipe/${data.colorRecipe.id}/color`);

        return [
            // Vanad
            ...data.colorRecipe.colors.slice(0, data.colorRecipe.colors.length - 1),
            // Uus
            {
                id: Math.random(),
                amount: data.color.amount,
                code: data.color.code,
            },
        ];
    }

    addHydrogenToColorRecipe(data) {
        // TODO API: Oleks vaja tagastada kõik recipe hydrogens
        // return this.postRequest(data, `appointment/${data.appointmentId}/color-recipe/${data.colorRecipe.id}/hydrogen`);

        return [
            // Vanad
            ...data.colorRecipe.hydrogens.slice(0, data.colorRecipe.hydrogens.length - 1),
            // Uus
            {
                id: Math.random(),
                name: data.hydrogen.name,
                amount: data.hydrogen.amount,
            },
        ];
    }
}
