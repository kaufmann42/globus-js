// https://docs.globus.org/api/transfer/endpoint/#operations

/**
 * getEndPoint - get's information about an endpoint given its endpointId.
 *
 * @param  {string} bearerToken token authorized by globus.org
 * @param  {string} endpointId  the id of the endpoint you'd like to base your share off of
 * @return {promise}            containing the body of the response
 */
exports.getEndPoint = function(bearerToken, endpointId) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'endpoint/' + endpointId;

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
        var url = transferBaseURL + 'shared_endpoint',
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

        request.post(url, shared_endpoint_json, callback).auth(null, null, true, bearerToken);
    });
};
