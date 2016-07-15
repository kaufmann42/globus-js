// https://docs.globus.org/api/transfer/endpoint/#operations

/**
 * getEndpointById - get's information about an endpoint given its endpoint_xid.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpoint_xid  The UUID of the endpoint.
 * @return {promise}            containing the body of the response
 */
exports.getEndpointById = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid;

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
 * createEndpoint - (__UNTESTED__) Create an endpoint. Which fields are required depends on the type of endpoint. Note that name and canonical_name are deprecated and supported only for backward compatibility; display_name should be used instead of, or in addition to, these fields. If canonical_name is not set, it will default to "USERNAME#ENDPOINT_UUID". At least one of them must be specified.

The result will include an id field containing the globally unique endpoint id, which should be used to further manipulate the endpoint document, and to perform transfers and other operations on the endpoint’s filesystem.
 *
 * @param  {string} bearerToken      token authorized by globus.org
 * @param  {string} display_name     Friendly name for the endpoint, not unique. Unicode string, max 128 characters, no new lines (\r or \n). If not specified, will default to canonical_name, but that is deprecated and all new clients hould use id and display_name. Searchable.
 * @param  {array} server_documents Array of [server documents](https://docs.globus.org/api/transfer/endpoint/#server_document) that each represents a network service that provides access to a filesystem. The most common type is a GridFTP server, which is represented by scheme "gsiftp". This is also the default scheme.
 * @return {promise}            containing the body of the response
 */
exports.createEndpoint = function(bearerToken, display_name, server_documents) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint',
            reqBody = {
                json: {
                    display_name: display_name,
                    DATA: server_documents
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
 * createSharedEndpoint - creates a shared_endpoint endpoint that it's ACL can be editted
 * to share paths with certain people.
 *
 * @param  {string} bearerToken  token authorized by globus.org
 * @param  {string} displayName  Friendly name for the endpoint, not unique. Unicode string, max 128 characters, no new lines (\r or \n). If not specified, will default to canonical_name, but that is deprecated and all new clients hould use id and display_name. Searchable.
 * @param  {string} hostId       Id of standard endpoint hosting the shared endpoint.
 * @param  {string} path         Root path being shared on the host endpoint.
 * @param  {string} description  A description of the endpoint. Unicode string, max length 4096 characters. Included in fulltext search.
 * @param  {string} organization Organization that runs the server(s) represented by the endpoint. Optional to preserve backward compatibility, but will eventually be required and all clients are encouraged to require users to specify it. Unicode string, max 1024 characters, no new lines. Searchable.
 * @return {promise}             containing the body of the response
 */
exports.createSharedEndpoint = function(bearerToken, displayName, hostId, path, description, organization) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'shared_endpoint',
            reqBody = {
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

        request.post(url, reqBody, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * exports - Update an endpoint. This can be done using a partial document by specifying only DATA_TYPE and the fields to be updated, or doing a GET on the endpoint,
 * changing the appropriate fields, and doing a PUT of the full document. Using a partial document is preferred.
 *
 * @param  {string} bearerToken               token authorized by globus.org
 * @param  {string} endpoint_xid              The UUID of the endpoint.
 * @param  {object} partial_endpoint_document Look at this [link](https://docs.globus.org/api/transfer/endpoint/#update_endpoint_by_id) for an explanation of a partial_endpoint_document based off of server and updated fields.
 * @return {promise}             containing the body of the response
 */
exports.updateEndpointById = function(bearerToken, endpoint_xid, partial_endpoint_document) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid,
            reqBody = {
                json: partial_endpoint_document
            };

        request.put(url, reqBody, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * deleteEndpointById - Delete an endpoint by id or canonical name (the latter is deprecated). Only the owner can delete the endpoint. Note that all data associated with the endpoint,
 *  including roles and the ACL, will be deleted as well. If the hostname of the server has changed, the server document(s) in the endpoint should be changed rather than deleting and
 *  recreating the endpoint with different servers.
 *
 * @param  {string} bearerToken               token authorized by globus.org
 * @param  {string} endpoint_xid              The UUID of the endpoint.
 * @return {promise}             containing the body of the response
 */
exports.deleteEndpointById = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid;

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.delete(url, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * getEffectivePauseRuleList - Get all pause rules on an endpoint that affect the current user, with sensitive administrator only fields removed.
 *
 * @param  {string} bearerToken               token authorized by globus.org
 * @param  {string} endpoint_xid              The UUID of the endpoint.
 * @return {promise}             containing the body of the response
 */
exports.getEffectivePauseRuleList = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/my_effective_pause_rule_list';

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
 * getEndpointServerList - Get a list of all servers belonging to the specified endpoint. Note that this is the same as the server list included under the "DATA" key
 * of the endpoint document.
 *
 * @param  {string} bearerToken               token authorized by globus.org
 * @param  {string} endpoint_xid              The UUID of the endpoint.
 * @return {promise}             containing the body of the response
 */
exports.getEndpointServerList = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/server_list';

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
 * getEndpointServerById - Get a specific server belonging to the specified endpoint.
 *
 * @param  {string} bearerToken   token authorized by globus.org
 * @param  {string} endpoint_xid  The UUID of the endpoint.
 * @param  {string} server_id     UUID of the server you want get.
 * @return {promise}             containing the body of the response
 */
exports.getEndpointServerById = function(bearerToken, endpoint_xid, server_id) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/server_list';

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
 * exports - Add a server to the specified endpoint. The hostname field is required, scheme and port default to "gsiftp" and 2811, and subject defaults to "null". The derived fields
 * and boolean status fields are ignored, and should not be included in the request body.
 * Returns a result document containing the id of the newly added server.
 *
 * @param  {string} bearerToken   token authorized by globus.org
 * @param  {string} endpoint_xid  The UUID of the endpoint.
 * @param  {string} hostname     Hostname of the server.
 * @param  {string} uri          URI of the server. This is a derived field combining the scheme, hostname, and port, and is not used when creating servers.
 * @param  {string} port         Port the server is listening on. Default: 2811.
 * @param  {string} scheme       URI scheme (protocol) used by the endpoint. Must be "gsiftp" or "ftp". Default: "gsiftp".
 * @return {promise}             containing the body of the response
 */
exports.addEndpointServer = function(bearerToken, endpoint_xid, hostname, uri, port, scheme) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/server',
            reqBody = {
                json: {
                    DATA_TYPE: "server",
                    hostname: hostname,
                    uri: uri,
                    port: port || '2811',
                    scheme: scheme || 'gsiftp'
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
 * updateEndpointServerById - Update a server belonging to the specified endpoint. Include only the fields to be updated in the request body - any of hostname, scheme, port, and subject can be updated.
 *
 * @param  {string} bearerToken   token authorized by globus.org
 * @param  {string} endpoint_xid  The UUID of the endpoint.
 * @param  {type} server_id       The UUID of the server you wish to update.
 * @param  {string} hostname     Hostname of the server.
 * @param  {string} uri          URI of the server. This is a derived field combining the scheme, hostname, and port, and is not used when creating servers.
 * @param  {string} port         Port the server is listening on. Default: 2811.
 * @param  {string} scheme       URI scheme (protocol) used by the endpoint. Must be "gsiftp" or "ftp". Default: "gsiftp".
 * @param  {string} subject      subject of the x509 certificate of the server. If not specified, the CN in the subject must match its hostname.
 * @return {promise}             containing the body of the response
 */
exports.updateEndpointServerById = function(bearerToken, endpoint_xid, server_id, hostname, uri, port, scheme, subject) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/server/' + server_id,
            reqBody = {
                json: {
                    DATA_TYPE: "server",
                    hostname: hostname,
                    uri: uri,
                    port: port || '2811',
                    scheme: scheme || 'gsiftp',
                    subject: subject
                }
            };

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.put(url, reqBody, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * deleteEndpointById - Delete a server belonging to the specified endpoint.
 *
 * @param  {string} bearerToken   token authorized by globus.org
 * @param  {string} endpoint_xid  The UUID of the endpoint.
 * @param  {type} server_id       The UUID of the server you wish to update.
 * @return {promise}             containing the body of the response
 */
exports.deleteEndpointById = function(bearerToken, endpoint_xid, server_id) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + '/server/' + server_id;

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.delete(url, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * getSharedEndpointList - Get a list of shared endpoints owned by the current user and hosted by a given GridFTP or Globus Connect Personal endpoint. Returns a
 * "BadRequest" error if called on an endpoint that can’t host shared endpoints.
 *
 * @param  {string} bearerToken   token authorized by globus.org
 * @param  {string} endpoint_xid  The UUID of the endpoint.
 * @return {promise}              containing the body of the response
 */
exports.getSharedEndpointList = function(bearerToken, endpoint_xid) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpoint_xid + 'my_shared_endpoint_list';

        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.get(url, callback).auth(null, null, true, bearerToken);
    });
};
