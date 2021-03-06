import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';
import http from './httpServices';

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token"

http.setJwt(getJwt()) //Autenticate User to do things like edit, delete, add

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password })
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}
export function loginWithAuth(jwt) {
    localStorage.setItem(tokenKey, jwt);
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt)

    } catch (error) {
        return null
    }
}
function getJwt() {
    return localStorage.getItem(tokenKey)
}
export default {
    login,
    loginWithAuth,
    logout,
    getCurrentUser,
}