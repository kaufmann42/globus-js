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
    -   ~~Endpoint ACL~~
-   Write script prepublish to construct minified globus.js file
-   Reformat README to be more readable
    -   Add contributing documentation
-   Move documentation to github wiki

# API

## getAccessRulesList

getAccessRulesList - Get the list of access rules in the ACL for a specified endpoint.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org.
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to list ACL's from.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response.

## getAccessRulesListById

getAccessRulesListById - Get a single access rule for a specified endpoint by id.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org.
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to get an ACL from.
-   `id` **int** Integer id of an access rule.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response.

## createAccessRule

createAccessRule - opens an access point with a given user. Shared endpoint_xid's can be
found by looking at the details of the endpoint you want to piggy back off of.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org.
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to base your share off of.
-   `userId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the UUID of the user you'd like to share this endpoint with
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an absolute path to the resoureces you'd like to share
-   `permissions` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a combination of 'r', 'w', to give the user read and write permissions
-   `userEmail` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the email of the user you'd like to notify
-   `emailMessage` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the message you'd like to attach to the e-mail

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## updateAccessRule

updateAccessRule - Update the permissions on an existing access rule. Other fields (besides DATA_TYPE which must always be present) may be omitted.
If the id is present it must match the id in the URL.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to base your share off of.
-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Unique id for this access rule. Implicit access rules from "access_manager" role assignments will have a null id, see role_id.
-   `role_id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** description
-   `principal_type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of principal that the rule applies to. One of "identity", "group", or "all_authenticated_users" or "anonymous".
-   `principal` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The subject of the access rule; the interpretation depends on principal_type: [See link here for options.](https://docs.globus.org/api/transfer/acl/#fields)
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Absolute path to a directory the access rule applies to. The path must begin and end with a slash, and can’t contain un-normalized components "/../" or "/./". GridFTP endpoints and shared endpoints hosted on GridFTP endpoints also support home directory relative paths beginning with "/~/". The path is limited to 2000 characters after encoding; in practice this means 2000 ascii characters and slightly less when unicode is present and must be encoded.
-   `permissions` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** How much permission to grant the principal specified in principal_type and principal. Either read-only, specified as "r", or read-write, specified as "rw".

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## deleteAccessRule

deleteAccessRule - Delete a single access rule, specified by id.
Returns a result document with code "Deleted" on success and HTTP status code 200, and an "AccessRuleNotFound" error if the rule has already been deleted.
If the client is using a retry loop, both should be accepted as success in case the first successful attempt is disconnected after the request is processed
but before the response is received by the client.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the id of the endpoint you'd like to delete an ACL from
-   `id` **int** Integer id of an access rule.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getActivationRequirements

getActivationRequirements - Gets the activation requirements of a particular endpoint.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of endpoint you want to get the activation requirements for

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## autoActivateEndpoint

autoActivateEndpoint - Attempt to auto activate an endpoint. The response will always contain a code field. If the code is "AutoActivateFailed", the response will also include an
activation requirements document, which can be filled in and submited to activate. On success, it will return a result code of the form "AutoActivated.CREDENTIAL_SOURCE", where
CREDENTIAL_SOURCE indicates the how the credential was acquired.

**Parameters**

-   `bearerToken` **type** description
-   `endpoint_xid` **type** description

Returns **type** description

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
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of endpoint you want to activate
-   `activation_requirements_document` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** a json object gotten from getActivationRequirements(..) with the required values filled in (<https://docs.globus.org/api/transfer/endpoint_activation/#activation_requirements_document>)

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## deactivateEndpoint

deactivateEndpoint - Deactivates a endpoint given its UUID.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of endpoint you want to deactivate

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getUserId

getUserId - Given a token authorized by globus.org and a user's e-mail registered by globus
it returns the user's id. Can be used in conjunction with shareEndpointWithUser's userId
feild.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `userEmail` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** User's e-mail

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getEndpointById

getEndpointById - get's information about an endpoint given its endpoint_xid.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## createEndpoint

createEndpoint - (**UNTESTED**) Create an endpoint. Which fields are required depends on the type of endpoint. Note that name and canonical_name are deprecated and supported only for backward compatibility; display_name should be used instead of, or in addition to, these fields. If canonical_name is not set, it will default to "USERNAME#ENDPOINT_UUID". At least one of them must be specified.

The result will include an id field containing the globally unique endpoint id, which should be used to further manipulate the endpoint document, and to perform transfers and other operations on the endpoint’s filesystem.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `display_name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Friendly name for the endpoint, not unique. Unicode string, max 128 characters, no new lines (\\r or \\n). If not specified, will default to canonical_name, but that is deprecated and all new clients hould use id and display_name. Searchable.
-   `server_documents` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of [server documents](https://docs.globus.org/api/transfer/endpoint/#server_document) that each represents a network service that provides access to a filesystem. The most common type is a GridFTP server, which is represented by scheme "gsiftp". This is also the default scheme.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## createSharedEndpoint

createSharedEndpoint - creates a shared_endpoint endpoint that it's ACL can be editted
to share paths with certain people.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `displayName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Friendly name for the endpoint, not unique. Unicode string, max 128 characters, no new lines (\\r or \\n). If not specified, will default to canonical_name, but that is deprecated and all new clients hould use id and display_name. Searchable.
-   `hostId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of standard endpoint hosting the shared endpoint.
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Root path being shared on the host endpoint.
-   `description` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** A description of the endpoint. Unicode string, max length 4096 characters. Included in fulltext search.
-   `organization` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Organization that runs the server(s) represented by the endpoint. Optional to preserve backward compatibility, but will eventually be required and all clients are encouraged to require users to specify it. Unicode string, max 1024 characters, no new lines. Searchable.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## updateEndpointById

exports - Update an endpoint. This can be done using a partial document by specifying only DATA_TYPE and the fields to be updated, or doing a GET on the endpoint,
changing the appropriate fields, and doing a PUT of the full document. Using a partial document is preferred.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.
-   `partial_endpoint_document` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Look at this [link](https://docs.globus.org/api/transfer/endpoint/#update_endpoint_by_id) for an explanation of a partial_endpoint_document based off of server and updated fields.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## deleteEndpointById

deleteEndpointById - Delete an endpoint by id or canonical name (the latter is deprecated). Only the owner can delete the endpoint. Note that all data associated with the endpoint,
 including roles and the ACL, will be deleted as well. If the hostname of the server has changed, the server document(s) in the endpoint should be changed rather than deleting and
 recreating the endpoint with different servers.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getEffectivePauseRuleList

getEffectivePauseRuleList - Get all pause rules on an endpoint that affect the current user, with sensitive administrator only fields removed.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getEndpointServerList

getEndpointServerList - Get a list of all servers belonging to the specified endpoint. Note that this is the same as the server list included under the "DATA" key
of the endpoint document.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getEndpointServerById

getEndpointServerById - Get a specific server belonging to the specified endpoint.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.
-   `server_id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of the server you want get.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## addEndpointServer

exports - Add a server to the specified endpoint. The hostname field is required, scheme and port default to "gsiftp" and 2811, and subject defaults to "null". The derived fields
and boolean status fields are ignored, and should not be included in the request body.
Returns a result document containing the id of the newly added server.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.
-   `hostname` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Hostname of the server.
-   `uri` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URI of the server. This is a derived field combining the scheme, hostname, and port, and is not used when creating servers.
-   `port` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Port the server is listening on. Default: 2811.
-   `scheme` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URI scheme (protocol) used by the endpoint. Must be "gsiftp" or "ftp". Default: "gsiftp".

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## updateEndpointServerById

updateEndpointServerById - Update a server belonging to the specified endpoint. Include only the fields to be updated in the request body - any of hostname, scheme, port, and subject can be updated.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.
-   `server_id` **type** The UUID of the server you wish to update.
-   `hostname` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Hostname of the server.
-   `uri` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URI of the server. This is a derived field combining the scheme, hostname, and port, and is not used when creating servers.
-   `port` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Port the server is listening on. Default: 2811.
-   `scheme` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URI scheme (protocol) used by the endpoint. Must be "gsiftp" or "ftp". Default: "gsiftp".
-   `subject` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** subject of the x509 certificate of the server. If not specified, the CN in the subject must match its hostname.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## deleteEndpointServerById

deleteEndpointServerById - Delete a server belonging to the specified endpoint.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.
-   `server_id` **type** The UUID of the server you wish to update.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## getSharedEndpointList

getSharedEndpointList - Get a list of shared endpoints owned by the current user and hosted by a given GridFTP or Globus Connect Personal endpoint. Returns a
"BadRequest" error if called on an endpoint that can’t host shared endpoints.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token authorized by globus.org
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The UUID of the endpoint.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## listDirectoryContents

listDirectoryContents - List the contents of the directory at the specified path on an endpoint’s filesystem. The endpoint must be activated before performing this operation.

The path is specified in the path query parameter. If the parameter is not passed, the default path depends on the type of endpoint

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Token authorized by globus.org.
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The id of the endpoint you'd like to get an ACL from.
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** (**OPTIONAL**) For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.
-   `query_parameters` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** (**OPTIONAL**) Added on query parameters to the end of the string (must be prefixed with an ampersand).  [Link](https://docs.globus.org/api/transfer/file_operations/#dir_listing_query_parameters)

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response.

## makeDirectory

makeDirectory - Create a directory at the specified path on an endpoint filesystem. The endpoint must be activated before performing this operation.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Token authorized by globus.org.
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The id of the endpoint you'd like to get an ACL from.
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response.

## rename

rename - Rename or move a file or directory on an endpoint filesystem. The endpoint must be activated before performing this operation. When moving to a different parent directory, the parent directory of the new path must already exist.

**Parameters**

-   `bearerToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Token authorized by globus.org.
-   `endpoint_xid` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The id of the endpoint you'd like to get an ACL from.
-   `old_path` **type** For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.
-   `new_path` **type** For shared endpoints, S3 endpoints, and anonymous FTP endpoints, the default is /. For GridFTP endpoints, the default is /~/. Most of the time this will map to the user’s home directory. However the administrator of the GridFTP server can configure it to point elsewhere. Also as a special case, if the restricted paths configuration on the server does not allow the user’s home directory, it will fall back to /.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response.

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
