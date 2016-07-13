// https://docs.globus.org/api/auth/reference/#api_endpoints

/**
 * getUserId - Given a token authorized by globus.org and a user's e-mail registered by globus
 * it returns the user's id. Can be used in conjunction with shareEndpointWithUser's userId
 * feild.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} userEmail   User's e-mail
 * @return {promise}            containing the body of the response
 */
exports.getUserId = function(bearerToken, userEmail) {
    return new Promise(function(resolve, reject) {
        var url = authBaseURL + 'identities?usernames=' + userEmail.replace('@', '%40');

        request.get(url, callback).auth(null, null, true, bearerToken);
    });
};
