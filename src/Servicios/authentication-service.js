import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../Utiles/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
//var config = require('Config');

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { console.log(`authenticationService.currentUserSubject: ${currentUserSubject.value}`); return currentUserSubject.value },    
};

function login(pUsuario, pPassword) {    
    return fetch(`http://192.168.0.156:8181/api/Login/Login?pUsuario=${pUsuario}&pPassword=${pPassword}`)
        .then(handleResponse)
        .then(user => {
            console.log(`Usuario: ${user.Usuario} - Token: ${user.Token}`);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.Usuario));
            localStorage.setItem('userToken', JSON.stringify(user.Token))
            currentUserSubject.next(user.Usuario);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    currentUserSubject.next(null);
}