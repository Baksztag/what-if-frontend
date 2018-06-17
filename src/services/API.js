import axios from 'axios';
import firebase from 'firebase';

const API_URL = process.env.REACT_APP_API_URL;
const WS_URL = process.env.REACT_APP_WEBSOCKET_URL;

function getUserToken() {
    // console.log(firebase.auth().currentUser)
    return firebase.auth().currentUser.getIdToken(true)
        // .then(idToken => idToken)
    //TODO replace with actual token
        .then(idToken => firebase.auth().currentUser.uid)
        .catch(error => {
            console.log(error)

            return error;
        })
}

function getCurrentUser() {
    return firebase.auth().currentUser.uid;
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
    getCurrentUser,
    getUserToken,
    post,
    saveUserToken,
    WS_URL,
};
