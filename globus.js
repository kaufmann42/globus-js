var request = require('request'),
    transferBaseURL = 'https://transfer.api.globusonline.org/v0.10',
    authBaseURL = 'https://auth.globus.org/v2/api/';


/**
 * getUserId - Given a token authorized by globus.org and a user's e-mail registered by globus
 * it returns the user's id. Can be used in conjunction with shareEndpointWithUser's userId
 * feild.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} userEmail   User's e-mail
 * @return {promise}            contains a string of the User's UUID
 */
exports.getUserId = function(bearerToken, userEmail) {
  return new Promise(function(resolve, reject) {
    var url = authBaseURL + 'identities?usernames=' + userEmail.replace('@', '%40');

    function callback(err, response, body) {
        if (err) {
            reject(new Error(err));
        }
        resolve(JSON.parse(body).identities[0].id);
    }

    request.get(url, callback).auth(null, null, true, bearerToken);
  });
};


/**
 * shareEndpointWithUser - opens an access point with a given user. Shared endpointId's can be
 * found by looking at the details of the endpoint you want to piggy back off of.
 *
 * @param  {string} bearerToken  token authorized by globus.org
 * @param  {string} endpointId   the id of the endpoint you'd like to base your share off of
 * @param  {string} userId       the UUID of the user you'd like to share this endpoint with
 * @param  {string} path         an absolute path to the resoureces you'd like to share
 * @param  {string} userEmail    the email of the user you'd like to notify
 * @param  {string} emailMessage the message you'd like to attach to the e-mail
 * @return {promise}             containing the body of the response
 */
exports.shareEndpointWithUser = function(bearerToken, endpointId, userId, path, userEmail, emailMessage) {
  return new Promise(function(resolve, reject) {
    var url = transferBaseURL + '/endpoint/' + endpointId + '/access',
        acl_json = {
            json: {
                'DATA_TYPE': 'access',
                'principal_type': 'identity',
                'principal': userId,
                'path': path,
                'permissions': 'r',
                'notify_email': userEmail,
                'notify_message': emailMessage
            }
        };

    function callback(err, response, body) {
        if (err) {
            resolve(new Error(err));
        }
        resolve(body);
    }

    request.post(url, acl_json, callback).auth(null, null, true, bearerToken);
  });
};


/**
 * getEndPoint - get's information about an endpoint given its endpointId.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpointId  the id of the endpoint you'd like to base your share off of
 * @return {promise}            containing the body of the response
 */
exports.getEndPoint = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + '/endpoint/' + endpointId;

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
 * createEndPoint - creates a shared_endpoint endpoint that it's ACL can be editted
 * to share paths with certain people.
 *
 * @param  {string} bearerToken  token authorized by globus.org
 * @param  {string} displayName  display name of the endpoint
 * @param  {string} hostId       the Id of the host endpoint that this endpoint will append
 * @param  {string} path         an absolute path to the resoureces you'd like to share
 * @param  {string} description  a short description of the endpoint
 * @param  {string} organization the organization that is opening this endpoint
 * @return {promise}             containing the body of the response
 */
exports.createEndPoint = function(bearerToken, displayName, hostId, path, description, organization) {
  return new Promise(function(resolve, reject) {
    var url = transferBaseURL + '/shared_endpoint',
        shared_endpoint_json = {
            json: {
                'DATA_TYPE': 'shared_endpoint',
                'display_name': displayName,
                'host_endpoint': hostId,
                'host_path': path,
                'description': description,
                'organization': organization
            }
        };

    function callback(err, response, body) {
        if (err) {
            reject(new Error(err));
        }
        resolve(body);
    }

    request.post(url, shared_endpoint_json, callback).auth(null, null, true, bearerToken);
  });
};

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
 * @param  {string} bearerToken                      token authorized by globus.org
 * @param  {string} endpointId                       UUID of endpoint you want to activate
 * @param  {object} activation_requirements_document a json object gotten from getActivationRequirements(..) with the required values filled in (https://docs.globus.org/api/transfer/endpoint_activation/#activation_requirements_document)
 * @return {promise}                                  containing the body of the response
 */
exports.activateEndpoint = function(bearerToken, endpointId, activation_requirements_document) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + endpointId + '/activate';
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
 * @param  {string} endpointId  UUID of endpoint you want to deactivate
 * @return {promise}          containing the body of the response
 */
exports.deactivateEndpoint = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + endpointId + '/deactivate';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.post(url, callback).auth(null, null, true, bearerToken);
    });
};
