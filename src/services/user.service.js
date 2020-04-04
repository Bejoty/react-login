export const userService = {
    login,
    logout,
    register
};

/**
 * Calls the authentication API with the given user and returns the response.
 * @param username
 * @param password
 * @returns {Promise<Response>}
 */
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/users/authenticate', requestOptions)
        .then((response) => {
            const loggedInUser = handleResponse(response);

            // Save user session
            localStorage.setItem('user', JSON.stringify(loggedInUser));

            return loggedInUser;
        });
}

/**
 * Logs the user out from the current session.
 */
function logout() {
    localStorage.removeItem('user');
}

/**
 * Calls the registration API with the given user and returns the response.
 * @param user - The user to register
 * @returns {Promise<Response>}
 */
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}

/**
 * Handles the API response by returning a JSON object upon a successful request,
 * and otherwise returns a rejected Promise object with the error message.
 * @param response - API response object
 * @returns {Promise<never>|{username: string}|{id: *, username}|{}|any|Promise<any>}
 */
function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
