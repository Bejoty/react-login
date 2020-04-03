import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

    return function(dispatch) {
        dispatch(request({username, password}));
        return userService.login(username, password)
            .then((loggedInUser) => {
                dispatch(success(loggedInUser));

                // Save user session
                localStorage.setItem('user', JSON.stringify(loggedInUser));

                // Redirect to home page upon successful login
                history.push("/");
            })
            .catch((error) => {
                dispatch(failure(error));

                // Alert the user of the error
                dispatch(alertActions.error(`Error: ${error}`));
                setTimeout(() => dispatch(alertActions.clear()), 5000);
            });
    }
}

function logout() {
    userService.logout();

    return {
        type: userConstants.LOGOUT,
    };
}

function register(user) {
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

    return function(dispatch) {
        dispatch(request(user));

        return userService.register(user)
            .then((registeredUser) => {
                dispatch(success(registeredUser));

                // Alert the user of successful registration
                dispatch(alertActions.success('Registration successful'));
                setTimeout(() => dispatch(alertActions.clear()), 5000);

                // Redirect to login screen upon successful registration
                history.push("/login");
            })
            .catch((error) => {
                dispatch(failure(error));

                // Alert the user of the error
                dispatch(alertActions.error(`Error: ${error}`));
                setTimeout(() => dispatch(alertActions.clear()), 5000);
            });
    }
}
