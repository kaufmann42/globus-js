// https://docs.globus.org/api/transfer/file_operations/#operations

/**
 * listDirectoryContents - List the contents of the directory at the specified path on an endpoint’s filesystem. The endpoint must be activated before performing this operation.
 *
 * The path is specified in the path query parameter. If the parameter is not passed, the default path depends on the type of endpoint
 *
 * @param  {string} bearerToken       Token authorized by globus.org.
 * @param  {string} endpoint_xid      The id of the endpoint you'd like to get an ACL from.
 * @param  {string} path              For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.
 * @param  {string} query_parameters  Added on query parameters to the end of the string (must be prefixed with an ampersand).  [Link](https://docs.globus.org/api/transfer/file_operations/#dir_listing_query_parameters)
 * @return {promise}             containing the body of the response.
 */
exports.listDirectoryContents = function(bearerToken, endpoint_xid, path, query_parameters) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'operation/endpoint/' + endpoint_xid + '/ls?path=' + (path || '/') + query_parameters;

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
 * makeDirectory - Create a directory at the specified path on an endpoint filesystem. The endpoint must be activated before performing this operation.
 *
 * @param  {string} bearerToken       Token authorized by globus.org.
 * @param  {string} endpoint_xid      The id of the endpoint you'd like to get an ACL from.
 * @param  {string} path              For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.
 * @return {promise}             containing the body of the response.
 */
exports.makeDirectory = function(bearerToken, endpoint_xid, path) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'operation/endpoint/' + endpoint_xid + '/mkdir',
            req = {
                json: {
                    'DATA_TYPE': 'mkdir',
                    'path': path
                }
            };


        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.post(url, req, callback).auth(null, null, true, bearerToken);
    });
};


/**
 * rename - Rename or move a file or directory on an endpoint filesystem. The endpoint must be activated before performing this operation. When moving to a different parent directory, the parent directory of the new path must already exist.
 *
 * @param  {string} bearerToken       Token authorized by globus.org.
 * @param  {string} endpoint_xid      The id of the endpoint you'd like to get an ACL from.
 * @param  {type} old_path     For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.
 * @param  {type} new_path     For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.
 * @return {promise}             containing the body of the response.
 */
exports.rename = function(bearerToken, endpoint_xid, old_path, new_path) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'operation/endpoint/' + endpoint_xid + '/rename',
            req = {
                json: {
                    'DATA_TYPE': 'rename',
                    'old_path': old_path,
                    'new_path': new_path
                }
            };


        function callback(err, response, body) {
            if (err) {
                reject(new Error(err));
            }
            resolve(body);
        }

        request.post(url, req, callback).auth(null, null, true, bearerToken);
    });
};
