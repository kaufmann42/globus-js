var request = require('request'),
    transferBaseURL = 'https://transfer.api.globusonline.org/v0.10/endpoint/',
    authBaseURL = 'https://auth.globus.org/v2/api/';


/**
 * https://docs.globus.org/api/transfer/endpoint_activation/#get_activation_requirements
 * TODO: Test all of these methods.
 */


/**
 * getActivationRequirements - Gets the activation requirements of a particular endpoint.
 *
 * @param  {type} bearerToken token authorized by globus.org
 * @param  {type} endpointId  UUID of endpoint you want to activate
 * @return {promise}          containing the body of the response
 */
exports.getActivationRequirements = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + endpointId + '/activation_requirements';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.get(url, callback).auth(null, null, true, bearerToken);
    });
};

// TODO: 7.2. Autoactivate endpoint function will go here


/**
 * exports - description
 *
 * @param  {type} bearerToken description
 * @param  {type} endpointId  description
 * @param  {type} username    description
 * @param  {type} passphrase  description
 * @return {type}             description
 */
exports.activateEndpoint = function(bearerToken, endpointId, hostname, username, passphrase) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + endpointId + '/activate';
        var reqBody = {
            json: {
                "DATA_TYPE": "activation_requirements",
                "hostname": hostname,
                "username": username,
                "passphrase": passphrase
            }
        };

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.post(url, reqBody, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * deactivateEndpoint - Deactivates a endpoint given its UUID.
 *
 * @param  {type} bearerToken token authorized by globus.org
 * @param  {type} endpointId  UUID of endpoint you want to deactivate
 * @return {promise}          containing the body of the response
 */
exports.deactivateEndpoint = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + endpointId + '/deactivate';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(JSON.parse(body).identities[0].id);
        }

        request.post(url, callback).auth(null, null, true, bearerToken);
    });
};
