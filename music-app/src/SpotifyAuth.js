import axios from 'axios';

const CLIENT_ID = '7775117dae504f14b773f67bef517b76'; // Substitua pelo seu Client ID
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

export const getToken = () => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
        token = hash
            .substring(1)
            .split("&")
            .find(elem => elem.startsWith("access_token"))
            .split("=")[1];

        window.location.hash = "";
        window.localStorage.setItem("token", token);
    }

    return token;
};

export const logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
};

export const login = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
};
