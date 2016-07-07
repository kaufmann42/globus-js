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
 * @return {string}             User's UUID
 */
exports.getUserId = function(bearerToken, userEmail) {
    var url = authBaseURL + 'identities?usernames=' + userEmail.replace('@', '%40');

    function callback(err, response, body) {
        if (err) {
            console.error(err);
            return;
        }
        return JSON.parse(body).identities[0].id;
    }

    request.get(url, callback).auth(null, null, true, bearerToken);
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
 * @return {boolean}             true if successful and false if otherwise
 */
exports.shareEndpointWithUser = function(bearerToken, endpointId, userId, path, userEmail, emailMessage) {
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
            console.error(err);
            return false;
        }
        return true;
    }

    request.post(url, acl_json, callback).auth(null, null, true, bearerToken);
};


/**
 * getEndPoint - get's information about an endpoint given its endpointId.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpointId  the id of the endpoint you'd like to base your share off of
 * @return {object}             a JSON object of the representation of the endpoint
 */
exports.getEndPoint = function(bearerToken, endpointId) {
    var url = transferBaseURL + '/' + endpointId;

    function callback(err, response, body) {
        if (err) {
            console.error(err);
            return;
        }
        return body;
    }

    request.get(url, callback).auth(null, null, true, bearerToken);
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
 * @return {boolean}             returns true if successful
 */
exports.createEndPoint = function(bearerToken, displayName, hostId, path, description, organization) {
    var url = transferBaseURL + '/endpoint',
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
            console.error(err);
            return false;
        }
        return true;
    }

    request.post(url, shared_endpoint_json, callback).auth(null, null, true, bearerToken);
};
