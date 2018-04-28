function getUserToken() {
    return `Bearer ${localStorage.getItem("AUTH_TOKEN")};`
}

function saveUserToken(token) {
    localStorage.setItem("AUTH_TOKEN", token);
}

export default {
    getUserToken,
    saveUserToken
};
