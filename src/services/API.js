import axios from 'axios';
import firebase from 'firebase';

// const API_URL = 'http://localhost:4000';
const API_URL = 'http://172.20.10.2:4000';
// const WS_URL = 'ws://localhost:4000/s';
const WS_URL = 'ws://172.20.10.2:4000/s';

function getUserToken() {
    // console.log(firebase.auth().currentUser)
    return firebase.auth().currentUser.getIdToken(true)
        // .then(idToken => idToken)
    //TODO replace with actual token
        .then(idToken => firebase.auth().currentUser.uid)
        .catch(error => error)
}

// function getUserToken() {
    // return `Bearer ${localStorage.getItem("AUTH_TOKEN")};`
    // return firebase.auth().currentUser.getIdToken(true)
        // .then(idToken => {
        //     console.log(idToken)
        //     return `Bearer ${idToken}`;
        // })
        // .catch(error => {
        //     console.log(error)
        //     return '';
        // });
// }

function saveUserToken(token) {
    localStorage.setItem("AUTH_TOKEN", token);
}

function get(url) {
    return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
            //TODO replace with actual token
            idToken = firebase.auth().currentUser.uid
            return axios.get(`${API_URL}${url}`, {headers: {Authorization: `Bearer ${idToken}`}})
        })
        .catch(error => {
            return new Promise((resolve, reject) => {
                console.log(error)
                reject()
            })
        })
}

function post(url, data) {
    return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
            //TODO replace with actual token
            idToken = firebase.auth().currentUser.uid
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
    getUserToken,
    post,
    saveUserToken,
    WS_URL,
};
