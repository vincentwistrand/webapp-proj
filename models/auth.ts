import config from "../config/config.json";
import User from "../interface/user";
import UserData from "../interface/userData";

import storage from "./storage";

const authModel = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;

        if (token === null) {
            return false;
        }

        const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.auth_api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.auth_url}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        await storage.storeToken(result.data.token);
        await storage.storeCurrentUser(email);

        return {
            title: "Inloggning",
            message: result.data.message,
            type: "success",
        };
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.auth_api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.auth_url}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        return {
            title: "Registrering",
            message: result.data.message,
            type: "success",
        };
    },
    getAllUsers: async function getAllUsers(): Promise<Array<User>> {
        const response = await fetch(`${config.auth_url}/users?api_key=${config.auth_api_key}`);
        const result = await response.json();

        return result.data;
    },
    logout: async function logout() {
        await storage.deleteToken();
    },
    getUserData: async function getUserData(): Promise<Array<UserData>> {
        const token = await storage.readToken();

        const response = await fetch(`${config.auth_url}/data?api_key=${config.auth_api_key}`, {
            headers: {
              'x-access-token': token.token
            }
        });

        const result = await response.json();

        return result.data;
    },
    postUserData: async function postUserData(artefact: string) {
        const token = await storage.readToken();

        var data = {
            artefact: artefact,
            api_key: config.auth_api_key
        };

        console.log(data);

        const response = await fetch(`${config.auth_url}/data`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            }
        });

        const result = await response.json();

        console.log(result);

        //return result.data;
    },
    updateUserData: async function updateUserData(newArtefact: string, dataId: number) {
        const token = await storage.readToken();

        var data = {
            id: dataId,
            artefact: newArtefact,
            api_key: config.auth_api_key
        };

        const response = await fetch(`${config.auth_url}/data`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            }
        });

        //const result = await response.json();

        //console.log(result);

        //return result.data;
    }
};

export default authModel;