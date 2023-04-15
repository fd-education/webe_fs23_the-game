export default function authHeader() {
    const userString = localStorage.getItem('user');
    let user = null;

    if (userString) user = JSON.parse(userString);

    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken};
    } else {
        return {Authorization: ''};
    }
}
