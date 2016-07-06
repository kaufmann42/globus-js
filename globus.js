var request = require('request'),
    transferBaseURL = 'https://transfer.api.globusonline.org/v0.10',
    authBaseURL = 'https://auth.globus.org/v2/api/';

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
}

exports.shareEndpointWithUser = function(bearerToken, endpointId, userId, path, userEmail, emailMessage) {
    var url = transferBaseURL + '/endpoint/' + endpointId + '/access'
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
    }

    request.post(url, acl_json, callback).auth(null, null, true, bearerToken);
}

exports.getEndPoint = function(bearerToken, endpointId) {
    var url = transferBaseURL + '/' + endpointId
    request.get(url, callback).auth(null, null, true, bearerToken);
}

exports.createEndPoint = function(bearerToken, displayName, hostId, path, description, organization) {
    var url = transferBaseURL + '/endpoint'
    shared_endpoint_json = {
        json: {
            'DATA_TYPE': 'shared_endpoint',
            'display_name': displayName,
            'host_endpoint': hostId,
            'host_path': path,
            'description': description,
            'organization': organization
        }
    }

    function callback(err, response, body) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(body);
    }

    request.post(url, shared_endpoint_json, callback).auth(null, null, true, bearerToken);
}
