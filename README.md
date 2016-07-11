# globus-js

A package for interacting with the globus.org REST API.

[globus.org](globus.org)

## Install

npm install --save-dev globus-js

## TODO

-   Format modules into API logical section
    -   ~~Task Submission~~
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

## getUserId

getUserId - Given a token authorized by globus.org and a user's e-mail registered by globus
it returns the user's id. Can be used in conjunction with shareEndpointWithUser's userId
feild.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `userEmail` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** User's e-mail

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** contains a string of the User's UUID

## shareEndpointWithUser

shareEndpointWithUser - opens an access point with a given user. Shared endpointId's can be
found by looking at the details of the endpoint you want to piggy back off of.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpointId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to base your share off of
-   `userId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the UUID of the user you'd like to share this endpoint with
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an absolute path to the resoureces you'd like to share
-   `userEmail` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the email of the user you'd like to notify
-   `emailMessage` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the message you'd like to attach to the e-mail

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getEndPoint

getEndPoint - get's information about an endpoint given its endpointId.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpointId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to base your share off of

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## createEndPoint

createEndPoint - creates a shared_endpoint endpoint that it's ACL can be editted
to share paths with certain people.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `displayName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** display name of the endpoint
-   `hostId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the Id of the host endpoint that this endpoint will append
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an absolute path to the resoureces you'd like to share
-   `description` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a short description of the endpoint
-   `organization` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the organization that is opening this endpoint

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getActivationRequirements

getActivationRequirements - Gets the activation requirements of a particular endpoint.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpointId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of endpoint you want to get the activation requirements for

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## activateEndpoint

activateEndpoint - To active an endpoint, clients should get the activation
 requirements for the endpoint (either explicitly or from the autoactivate
 result), pick an activation method, and fill in values for the chosen
 activation method. The requirements for the other methods not being used
 must be removed before submitting the request.

On success, it will return a result code of the form "Activated.TYPE", where
TYPE indicates the type of activation used.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpointId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of endpoint you want to activate
-   `activation_requirements_document` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** a json object gotten from getActivationRequirements(..) with the required values filled in (<https://docs.globus.org/api/transfer/endpoint_activation/#activation_requirements_document>)

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## deactivateEndpoint

deactivateEndpoint - Deactivates a endpoint given its UUID.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpointId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of endpoint you want to deactivate

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

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
