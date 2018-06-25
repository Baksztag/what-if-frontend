import axios from 'axios';
import firebase from 'firebase';

const API_URL = process.env.REACT_APP_API_URL;
const WS_URL = process.env.REACT_APP_WEBSOCKET_URL;

function getUserToken() {
    return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => idToken)
        .catch(error => {
            return error;
        })
}

function getCurrentUser() {
    return firebase.auth().currentUser.uid;
}

function saveUserToken(token) {
    localStorage.setItem("AUTH_TOKEN", token);
}

function get(url) {
    return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
            return axios.get(`${API_URL}${url}`, {headers: {Authorization: `Bearer ${idToken}`}})
        })
        .catch(() => {
            return new Promise((resolve, reject) => {
                reject()
            })
        })
}

function post(url, data) {
    return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
            return axios.post(`${API_URL}${url}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    }
                })
        })
}

export default {
    get,
    getCurrentUser,
    getUserToken,
    post,
    saveUserToken,
    WS_URL,
};
