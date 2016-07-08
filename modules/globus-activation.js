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
 * activateEndpoint - To active an endpoint, clients should get the activation
 *  requirements for the endpoint (either explicitly or from the autoactivate
 *  result), pick an activation method, and fill in values for the chosen
 *  activation method. The requirements for the other methods not being used
 *  must be removed before submitting the request.
 *
 * On success, it will return a result code of the form "Activated.TYPE", where
 * TYPE indicates the type of activation used.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpointId  UUID of endpoint you want to activate
 * @param  {string} type        The type of activation this requirement is for.
 * @param  {string} name        The name for the information required.
 * @param  {string} value       Detailed description of the requirement.
 * @param  {boolean} required    Suggested name to display in a GUI.
 * @param  {boolean} private_feild     Boolean specifying if the data is sensetive, e.g. for password fields. Clients are encouraged to mask the user’s typing when prompting for values of private fields.
 * @param  {string} ui_name     true if the value is required for this type of activation.
 * @param  {string} description The value for the requirement. When GETing this will be either empty or have a default value filled in. When POSTing any values without defaults should be set, and the defaults can be overwritten when needed. Note that this must be a string, even for int-like fields.
 * @return {promise}          containing the body of the response
 */
exports.activateEndpoint = function(bearerToken, endpointId, type, name, value, required, private_feild, ui_name, description) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + endpointId + '/activate';
        var reqBody = {
            json: {
                "DATA_TYPE": "activation_requirements",
                "DATA": [{
                    "type": type,
                    "name": name,
                    "value": value,
                    "required": required,
                    "private": private_feild,
                    "ui_name": ui_name,
                    "description": description,
                    "DATA_TYPE": "activation_requirement"
                }]
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
