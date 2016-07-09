# globus-js

A package for interacting with the globus.org REST API.

[globus.org](globus.org)

## Install

npm install --save-dev globus-js

## TODO

-   Format modules into API logical section
    -   [Task Submission](https://docs.globus.org/api/transfer/task_submit/)
    -   [Task Monitoring](https://docs.globus.org/api/transfer/task/)
    -   [File Operations](https://docs.globus.org/api/transfer/file_operations/)
    -   [Endpoint Management](https://docs.globus.org/api/transfer/endpoint/)
    -   [Endpoint Search](https://docs.globus.org/api/transfer/endpoint_search/)
    -   [Endpoint Roles](https://docs.globus.org/api/transfer/endpoint_roles/)
    -   [Endpoint Bookmarks](https://docs.globus.org/api/transfer/endpoint_bookmarks/)
    -   [Endpoint ACL](https://docs.globus.org/api/transfer/acl/)
-   Write script prepublish to construct minified globus.js file
-   Reformat README to be more readable
-   Move documentation to github wiki

# API

## getSubmissionId

getSubmissionId - Get a submission id, required when submitting transfer and delete tasks.
Note that this is different than the task id returned by the submit operations.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response object

## submitTransferTask

submitTransferTask - Submits a transfer task.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `submission_id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Id acquired from getSubmissionId
-   `label` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** user specified string to help identify the Transfer or delete task.
-   `notify_on_succeeded` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true and the user has notification enabled, send a notification email when the transfer completes with status SUCCEEDED.
-   `notify_on_failed` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true and the user has notification enabled, send a notification email when the transfer completes with status FAILED.
-   `notify_on_inactive` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true and the user has notification enabled, send a notification email when the transfer enters status INACTIVE, e.g. from activation credentials expiring.
-   `source_endpoint` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of the endpoint to transfer data from.
-   `destination_endpoint` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of the endpoint to transfer data to.
-   `DATA` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** List of [transfer_item](https://docs.globus.org/api/transfer/task_submit/#transfer_item_fields) documents containing source and destination paths.
-   `encrypt_data` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If true, encrypt the data channel. If either the source or destination endpoint, or for shared endpoints the source or destination host endpoint, has force_encryption set, the data channel will be encrypted even if this is set to false.
-   `sync_level` **integer** review this [link](https://docs.globus.org/api/transfer/task_submit/#transfer_specific_fields) for information on this field.
-   `verify_checksum` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** After transfer, verify that the source and destination file checksums match. If they don’t, re-transfer the entire file and keep trying until it succeeds.
-   `preserve_timestamp` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Preserve file modification time.
-   `delete_destination_extra` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Delete extraneous files in the destination directory. Only applies for recursive directory transfers.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response object

## submitDeletionTask

submitDeletionTask - Submit a delete task to globus

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of the endpoint containing the file system you want to delete from
-   `DATA` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** List of [delete_item](https://docs.globus.org/api/transfer/task_submit/#delete_item_fields) documents containing paths to delete.
-   `recursive` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Delete directory contents recursively. Required if any of the delete items point to a directory.
-   `ignore_missing` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Don’t generate errors for non existent files and directories.
-   `interpret_globs` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Interpret shell globs at the end of paths. Supports \*, ?, [, and ] with their standard shell meanings and \\ for escaping, but only in the last segment of the path. If false (the default), these special characters will be escaped and treated as literals.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response object
