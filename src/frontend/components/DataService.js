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

    getHairdressers() {
        return this.getRequest('roles','hairdressers');
    }

    getAllWorkTypes() {
        return this.getRequest('work-types');
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

    removeAppointment(id) {
        return this.getRequest('appointment', 'remove', id);
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

    getAppointmentsByHairdresserId(id) {
        return this.getRequest('appointments', id)
    }


}
