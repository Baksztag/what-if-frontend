import axios from 'axios';
import firebase from 'firebase';

const API_URL = 'http://localhost:4000';

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
            return axios.get(`${API_URL}${url}`, {headers: {Authorization: `Bearer ${idToken}`}})
        })
        .catch(error => {
            return new Promise((resolve, reject) => {
                console.log(error)
                reject()
            })
        })

}

export default {
    get,
    // getUserToken,
    saveUserToken
};
