import axios from 'axios';

const API_URL = 'http://localhost:4000';

function getUserToken() {
    return `Bearer ${localStorage.getItem("AUTH_TOKEN")};`
}

function saveUserToken(token) {
    localStorage.setItem("AUTH_TOKEN", token);
}

function get(url) {
    return axios.get(`${API_URL}${url}`, {headers: {Authorization: getUserToken()}})
}

export default {
    get,
    getUserToken,
    saveUserToken
};
