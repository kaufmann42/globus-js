var request = require('request'),
    transferBaseURL = 'https://transfer.api.globusonline.org/v0.10/',
    authBaseURL = 'https://auth.globus.org/v2/api/';

// https://docs.globus.org/api/transfer/task_submit/#operations_requirements

/**
 * getSubmissionId - Get a submission id, required when submitting transfer and delete tasks.
 * Note that this is different than the task id returned by the submit operations.
 *
 * @param  {string} bearerToken     token authorized by globus.org
 * @return {promise}                containing the body of the response object
 */
exports.getSubmissionId = function(bearerToken) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + 'submission_id';

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
 * submitTransferTask - Submits a transfer task.
 *
 * @param  {string} bearerToken              token authorized by globus.org
 * @param  {string} submission_id            Id acquired from getSubmissionId
 * @param  {string} label                    user specified string to help identify the Transfer or delete task.
 * @param  {boolean} notify_on_succeeded     If true and the user has notification enabled, send a notification email when the transfer completes with status SUCCEEDED.
 * @param  {boolean} notify_on_failed        If true and the user has notification enabled, send a notification email when the transfer completes with status FAILED.
 * @param  {boolean} notify_on_inactive      If true and the user has notification enabled, send a notification email when the transfer enters status INACTIVE, e.g. from activation credentials expiring.
 * @param  {string} source_endpoint          UUID of the endpoint to transfer data from.
 * @param  {string} destination_endpoint     UUID of the endpoint to transfer data to.
 * @param  {object} DATA                     List of [transfer_item](https://docs.globus.org/api/transfer/task_submit/#transfer_item_fields) documents containing source and destination paths.
 * @param  {boolean} encrypt_data            If true, encrypt the data channel. If either the source or destination endpoint, or for shared endpoints the source or destination host endpoint, has force_encryption set, the data channel will be encrypted even if this is set to false.
 * @param  {integer} sync_level              review this [link](https://docs.globus.org/api/transfer/task_submit/#transfer_specific_fields) for information on this field.
 * @param  {boolean} verify_checksum          After transfer, verify that the source and destination file checksums match. If they don’t, re-transfer the entire file and keep trying until it succeeds.
 * @param  {boolean} preserve_timestamp       Preserve file modification time.
 * @param  {boolean} delete_destination_extra Delete extraneous files in the destination directory. Only applies for recursive directory transfers.
 * @return {promise}                containing the body of the response object
 */
exports.submitTransferTask = function(bearerToken, submission_id, label, notify_on_succeeded, notify_on_failed, notify_on_inactive, source_endpoint, destination_endpoint, DATA, encrypt_data, sync_level, verify_checksum, preserve_timestamp, delete_destination_extra) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + '/transfer';
        var reqBody = {
            json: {
                DATA_TYPE: 'transfer',
                submission_id: submission_id,
                label: label,
                notify_on_succeeded: notify_on_succeeded,
                notify_on_failed: notify_on_failed,
                notify_on_inactive: notify_on_inactive,
                source_endpoint: source_endpoint,
                destination_endpoint: destination_endpoint,
                DATA: DATA,
                encrypt_data: encrypt_data,
                sync_level: sync_level,
                verify_checksum: verify_checksum,
                preserve_timestamp: preserve_timestamp,
                delete_destination_extra: delete_destination_extra
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
 * submitDeletionTask - Submit a delete task to globus
 *
 * @param  {string} bearerToken     token authorized by globus.org
 * @param  {string} endpoint        UUID of the endpoint containing the file system you want to delete from
 * @param  {object} DATA            List of [delete_item](https://docs.globus.org/api/transfer/task_submit/#delete_item_fields) documents containing paths to delete.
 * @param  {boolean} recursive       Delete directory contents recursively. Required if any of the delete items point to a directory.
 * @param  {boolean} ignore_missing  Don’t generate errors for non existent files and directories.
 * @param  {boolean} interpret_globs Interpret shell globs at the end of paths. Supports *, ?, [, and ] with their standard shell meanings and \ for escaping, but only in the last segment of the path. If false (the default), these special characters will be escaped and treated as literals.
 * @return {promise}                 containing the body of the response object
 */
exports.submitDeletionTask = function(bearerToken, endpoint, DATA, recursive, ignore_missing, interpret_globs) {
    return new Promise(function(resolve, reject) {
        var url = transferBaseURL + '/delete';
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
