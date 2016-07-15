// https://docs.globus.org/api/transfer/endpoint_activation/#get_activation_requirements

/**
 * getActivationRequirements - Gets the activation requirements of a particular endpoint.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpoint_xid  UUID of endpoint you want to get the activation requirements for
 * @return {promise}          containing the body of the response
 */
exports.getActivationRequirements = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/activation_requirements';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.get(url, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * autoActivateEndpoint - Attempt to auto activate an endpoint. The response will always contain a code field. If the code is "AutoActivateFailed", the response will also include an
 * activation requirements document, which can be filled in and submited to activate. On success, it will return a result code of the form "AutoActivated.CREDENTIAL_SOURCE", where
 * CREDENTIAL_SOURCE indicates the how the credential was acquired.
 *
 * @param  {type} bearerToken  description
 * @param  {type} endpoint_xid description
 * @return {type}              description
 */
exports.autoActivateEndpoint = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/autoactivate';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.post(url, callback).auth(null, null, true, bearerToken);
    });
};

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
 * @param  {string} endpoint_xid                       UUID of endpoint you want to activate
 * @param  {object} activation_requirements_document a json object gotten from getActivationRequirements(..) with the required values filled in (https://docs.globus.org/api/transfer/endpoint_activation/#activation_requirements_document)
 * @return {promise}                                  containing the body of the response
 */
exports.activateEndpoint = function(bearerToken, endpoint_xid, activation_requirements_document) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/activate';
        var reqBody = {
            json: activation_requirements_document
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
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpoint_xid  UUID of endpoint you want to deactivate
 * @return {promise}          containing the body of the response
 */
exports.deactivateEndpoint = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/deactivate';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.post(url, callback).auth(null, null, true, bearerToken);
    });
};
