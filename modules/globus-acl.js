var request = require('request'),
    transferBaseURL = 'https://transfer.api.globusonline.org/v0.10/';


// https://docs.globus.org/api/transfer/acl

/**
 * getAccessRulesList - Get the list of access rules in the ACL for a specified endpoint.
 *
 * @param  {string} bearerToken  token authorized by globus.org.
 * @param  {string} endpointId   the id of the endpoint you'd like to list ACL's from.
 * @return {promise}             containing the body of the response.
 */
exports.getAccessRulesList = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/access_list';

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
 * getAccessRulesList - Get a single access rule for a specified endpoint by id.
 *
 * @param  {string} bearerToken  token authorized by globus.org.
 * @param  {string} endpointId   the id of the endpoint you'd like to get an ACL from.
 * @param  {int} id          Integer id of an access rule.
 * @return {promise}             containing the body of the response.
 */
exports.getAccessRulesList = function(bearerToken, endpointId, id) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/access/' + id;

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
 * createAccessRule - opens an access point with a given user. Shared endpointId's can be
 * found by looking at the details of the endpoint you want to piggy back off of.
 *
 * @param  {string} bearerToken  token authorized by globus.org.
 * @param  {string} endpointId   the id of the endpoint you'd like to base your share off of.
 * @param  {string} userId       the UUID of the user you'd like to share this endpoint with
 * @param  {string} path         an absolute path to the resoureces you'd like to share
 * @param  {string} permissions  a combination of 'r', 'w', to give the user read and write permissions
 * @param  {string} userEmail    the email of the user you'd like to notify
 * @param  {string} emailMessage the message you'd like to attach to the e-mail
 * @return {promise}             containing the body of the response
 */
exports.createAccessRule = function(bearerToken, endpointId, userId, path, permissions, userEmail, emailMessage) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/access',
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
 * updateAccessRule - Update the permissions on an existing access rule. Other fields (besides DATA_TYPE which must always be present) may be omitted.
 * If the id is present it must match the id in the URL.
 *
 * @param  {string} bearerToken  token authorized by globus.org
 * @param  {string} id             Unique id for this access rule. Implicit access rules from "access_manager" role assignments will have a null id, see role_id.
 * @param  {string} role_id        description
 * @param  {string} principal_type Type of principal that the rule applies to. One of "identity", "group", or "all_authenticated_users" or "anonymous".
 * @param  {string} principal      The subject of the access rule; the interpretation depends on principal_type: [See link here for options.](https://docs.globus.org/api/transfer/acl/#fields)
 * @param  {string} path           Absolute path to a directory the access rule applies to. The path must begin and end with a slash, and can’t contain un-normalized components "/../" or "/./". GridFTP endpoints and shared endpoints hosted on GridFTP endpoints also support home directory relative paths beginning with "/~/". The path is limited to 2000 characters after encoding; in practice this means 2000 ascii characters and slightly less when unicode is present and must be encoded.
 * @param  {string} permissions    How much permission to grant the principal specified in principal_type and principal. Either read-only, specified as "r", or read-write, specified as "rw".
 * @return {promise}             containing the body of the response
 */
exports.updateAccessRule = function(bearerToken, id, role_id, principal_type, principal, path, permissions) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/access',
            acl_json = {
                json: {
                    'DATA_TYPE': 'access',
                    'id': id,
                    'role_id': role_id,
                    'principal_type': principal_type,
                    'principal': principal,
                    'path': path,
                    'permissions': permissions
                }
            };

        function callback(err, response, body) {
            if (err) {
                resolve(new Error(err));
            }
            resolve(body);
        }

        request.put(url, acl_json, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * deleteAccessRule - Delete a single access rule, specified by id.
 * Returns a result document with code "Deleted" on success and HTTP status code 200, and an "AccessRuleNotFound" error if the rule has already been deleted.
 * If the client is using a retry loop, both should be accepted as success in case the first successful attempt is disconnected after the request is processed
 * but before the response is received by the client.
 *
 * @param  {string} bearerToken  token authorized by globus.org
 * @param  {string} endpointId   the id of the endpoint you'd like to delete an ACL from
 * @param  {int} id          Integer id of an access rule.
 * @return {promise}             containing the body of the response
 */
exports.deleteAccessRule = function(bearerToken, endpointId, id) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId + '/access/' + id;

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.delete(url, callback).auth(null, null, true, bearerToken);
    });
};
