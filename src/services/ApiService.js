import axios from "axios";
import Authentication from "../utils/Authenticate";
const API_URL = process.env.REACT_APP_API_URL;

class ApiService {

    login = (path, data) => {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + path, data, {
            }).then(response => {
                (response.status === 201) ? resolve(response) : reject(response);
            }).catch(({ response }) => {
                if (response.status === 401) this.handleUnauthorized();
                reject(response)
            })
        })
    }

    get = (path) => {
        const Authenticate = new Authentication();
        const token = Authenticate.getCookie('_pat')?._token;
        return new Promise((resolve, reject) => {
            axios.get(API_URL + path, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(response => {
                if (response.status === 200) resolve(response);
                reject(response);
            }).catch(({ response }) => {
                if (response.status === 401) this.handleUnauthorized();
                reject(response);
            })
        });
    }

    post = (path, data) => {
        const Authenticate = new Authentication();
        const token = Authenticate.getCookie('_pat')?._token;
        return new Promise((resolve, reject) => {
            axios.post(API_URL + path, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(response => {
                if (response.status === 401) this.handleUnauthorized();
                (response.status === 201 || response.status === 200) ? resolve(response) : reject(response);
            }).catch(({ response }) => {
                if (response.status === 401) this.handleUnauthorized();
                reject(response)
            })
        })
    }

    handleUnauthorized = () => {
        const Authenticate = new Authentication();
        Authenticate.deleteCookies();
        window.location.href = '/login';
    }
}

export default new ApiService();