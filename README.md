# globus-js

A npm package for working with the globus API through HTTP REST calls

## Install

npm install --save-dev globus-js

# API

## getActivationRequirements

<https://docs.globus.org/api/transfer/endpoint_activation/#get_activation_requirements>
TODO: Test all of these methods.

**Parameters**

-   `bearerToken`  
-   `endpointId`  

## getActivationRequirements

getActivationRequirements - Gets the activation requirements of a particular endpoint.

**Parameters**

-   `bearerToken` **type** token authorized by globus.org
-   `endpointId` **type** UUID of endpoint you want to activate

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

-   `bearerToken` **type** token authorized by globus.org
-   `endpointId` **type** UUID of endpoint you want to activate
-   `type` **type** The type of activation this requirement is for.
-   `name` **type** The name for the information required.
-   `value` **type** Detailed description of the requirement.
-   `required` **type** Suggested name to display in a GUI.
-   `private_feild` **type** Boolean specifying if the data is sensetive, e.g. for password fields. Clients are encouraged to mask the user’s typing when prompting for values of private fields.
-   `ui_name` **type** true if the value is required for this type of activation.
-   `description` **type** The value for the requirement. When GETing this will be either empty or have a default value filled in. When POSTing any values without defaults should be set, and the defaults can be overwritten when needed. Note that this must be a string, even for int-like fields.

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

## deactivateEndpoint

deactivateEndpoint - Deactivates a endpoint given its UUID.

**Parameters**

-   `bearerToken` **type** token authorized by globus.org
-   `endpointId` **type** UUID of endpoint you want to deactivate

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** containing the body of the response

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
