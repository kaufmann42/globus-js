// https://docs.globus.org/api/transfer/endpoint_activation/#get_activation_requirements

/**
 * getActivationRequirements - Gets the activation requirements of a particular endpoint.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpointId  UUID of endpoint you want to get the activation requirements for
 * @return {promise}          containing the body of the response
 */
exports.getActivationRequirements = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/activation_requirements';

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
 * @param  {string} bearerToken                      token authorized by globus.org
 * @param  {string} endpointId                       UUID of endpoint you want to activate
 * @param  {object} activation_requirements_document a json object gotten from getActivationRequirements(..) with the required values filled in (https://docs.globus.org/api/transfer/endpoint_activation/#activation_requirements_document)
 * @return {promise}                                  containing the body of the response
 */
exports.activateEndpoint = function(bearerToken, endpointId, activation_requirements_document) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/activate';
        var reqBody = {
            json: activation_requirements_document
        };

        request.post(url, reqBody, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * deactivateEndpoint - Deactivates a endpoint given its UUID.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpointId  UUID of endpoint you want to deactivate
 * @return {promise}          containing the body of the response
 */
exports.deactivateEndpoint = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/deactivate';

        request.post(url, callback).auth(null, null, true, bearerToken);
    });
};
