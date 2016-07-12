
/**
 * INSTRUCTIONS:
 *  1. Remove the .example from this file name. (e.g. on the command line `mv private-info.example.js private-info.js`).
 *  2. Get a Bearer Token from globus.org and replace 'YOUR_BEARER_TOKEN_HERE' with your personal Bearer Token.
 *    a. Open a web page to https://tokens.globus.org/ and continue until you get your personal 'Transfer API Token'.
 *  3. Get an endpoint UUID number from your globus.org account endpoint's page and replace 'YOUR_ENDPOINT_ID_HERE' with your personal endpoint UUID.
 *    a. Log in to Globus.org.
 *    b. Click 'Endpoints.'
 *    c. Click on an endpoint OR search for an publicly managed endpoint
 *    d. In the 'Overview' tab scroll to the bottom of the page and copy down your endpoint's UUID.
 *  4. get the activation requirements document by using the getActivationRequirements(..) method and reviewing the body replacing required null 'values' in 'DATA' array.
 *  5. get an example transfer and deletion document (https://docs.globus.org/api/transfer/task_submit/#transfer_and_delete_documents) for task submission.
 */

exports.getBearerToken = function() {
  return 'YOUR_BEARER_TOKEN_HERE';
}

exports.getEndPointId = function() {
  return 'YOUR_ENDPOINT_ID_HERE';
}

exports.getActivationRequirementsDocument = function() {
    return {
        "DATA_TYPE": "activation_requirements",
        "expires_in": 40901,
        "auto_activation_supported": true,
        "activated": true,
        "length": 7,
        "expire_time": "2016-07-09 03:08:22+00:00",
        "DATA": [{
            "name": "public_key",
            "DATA_TYPE": "activation_requirement",
            "required": false,
            "private": false,
            "value": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsrZDZPuPSnyfagzhDGZr\nytlkAASmkMgVzrhylDotxJ9sNWus8ouPtYi2tBxRVQkTYCP6BOOaH+9TZP1gEzJN\nPufNw7+2i3q79AIsDs5hT9+9DpbiLnsrvNYBj99jv30O6MbaLPqVnMldUnxpAfwN\n2RWj+/uefIYabCE0Wmh0M8gTi976TQUfWT4ANlEuTjn6d6N2GG8vheYls91Wi25d\nXMCx6R5XZia50Br/tW4cnwokQSbM1duu6gfIAAjTCPKp01J0D7Z2XRifP4fq6Qh0\nkrWZ0i+Yah6PG1FOrmLPNM8Ws4HTW2+CS1POiAkWTyNuk4B3heSx0WdR/w9G2tf/\ngW0fEykjh22JzcYPb3V2P5zJj6HuSYxZPWNeiXzc9IrH8yEjRR+aZryPrsDmlYq3\n9H4gOKpwwdo5hW40zkDZ3QIEKCKNy0TwK/ayx1dHT+k+v3vMKIPLLOoF3PGSEqsw\npIaO9YeBfyO6ivbqzdZsVD73Gdk4Ox+lzh02JheMvvLbf2ymCZlUMYh3gk9V5t0h\nqQsGQGk/R2l7+8c1836AIfCZpT/LXzwqkAGJAk+b5OUhYxfI9a6EPpJ+KkN1Yzt6\nYCauVyvJHW4HmNqtnJkPx8AW2PUB6WlkHpA/RhWYD9jCr4a4IimOuyeB4TeRgdLe\nzix1sMdf97pdG1RtCx7LH+kCAwEAAQ==\n-----END PUBLIC KEY-----\n",
            "ui_name": "Server Public Key",
            "type": "delegate_proxy",
            "description": "The public key of the GO API server to use in the proxy certificate for delegation to GO, in PEM format."
        }, {
            "name": "proxy_chain",
            "DATA_TYPE": "activation_requirement",
            "required": true,
            "private": false,
            "value": null,
            "ui_name": "Proxy Chain",
            "type": "delegate_proxy",
            "description": "A proxy certificate using the provided public key, in PEM format."
        }, {
            "name": "hostname",
            "DATA_TYPE": "activation_requirement",
            "required": true,
            "private": false,
            "value": null,
            "ui_name": "MyProxy Server",
            "type": "myproxy",
            "description": "The hostname of the MyProxy server to request a credentail from."
        }, {
            "name": "username",
            "DATA_TYPE": "activation_requirement",
            "required": true,
            "private": false,
            "value": "kaufmann42",
            "ui_name": "Username",
            "type": "myproxy",
            "description": "The username to use when connecting to the MyProxy serever."
        }, {
            "name": "passphrase",
            "DATA_TYPE": "activation_requirement",
            "required": true,
            "private": true,
            "value": "RG747Genotyping2",
            "ui_name": "Passphrase",
            "type": "myproxy",
            "description": "The passphrase to use when connecting to the MyProxy serever."
        }, {
            "name": "server_dn",
            "DATA_TYPE": "activation_requirement",
            "required": false,
            "private": false,
            "value": "/C=US/O=Globus Consortium/OU=Globus Connect Service/CN=cda4d6d6-5d11-11e3-9a07-12313d2005b7",
            "ui_name": "Server DN",
            "type": "myproxy",
            "description": "The distinguished name of the MyProxy server, formated with '/' as the separator. This is only needed if the server uses a non-standard certificate and the hostname does not match."
        }, {
            "name": "lifetime_in_hours",
            "DATA_TYPE": "activation_requirement",
            "required": false,
            "private": false,
            "value": null,
            "ui_name": "Credential Lifetime (hours)",
            "type": "myproxy",
            "description": "The lifetime for the credential to request from the server, in hours. Depending on the MyProxy server's configuration, this may not be respected if it's too high. If no lifetime is submitted, the value configured as the default on the  server will be used."
        }],
        "oauth_server": null
    };
};

exports.getTransferDocument = function() {
    return {
        DATA_TYPE: 'transfer',
        submission_id: 'YOUR_SUBMISSION_ID_HERE',
        label: 'testing',
        notify_on_succeeded: true,
        notify_on_failed: true,
        notify_on_inactive: true,
        source_endpoint: 'YOUR_SOURCE_ENDPOINT_HERE',
        destination_endpoint: 'YOUR_DESTINATION_ENDPOINT_HERE',
        encrypt_data: true,
        sync_level: 0,
        verify_checksum: true,
        preserve_timestamp: false,
        delete_destination_extra: false,
        DATA: [{
            DATA_TYPE: 'transfer_item',
            source_path: 'YOUR_SOURCE_ABSOLUTE_PATH_HERE',
            destination_path: 'YOUR_DESTINATION_ABSOLUTE_PATH_HERE',
            recursive: true
        }]
    };
};

exports.getDeleteDocument = function() {
    return {
        DATA_TYPE: 'transfer',
        submission_id: 'YOUR_SUBMISSION_ID_HERE',
        label: 'testing',
        notify_on_succeeded: true,
        notify_on_failed: true,
        notify_on_inactive: true,
        endpoint: 'YOUR_ENDPOINT_ID_HERE',
        recursive: false,
        ignore_missing: true,
        interpret_globs: true,
        DATA: [{
            DATA_TYPE: 'delete_item',
            path: 'YOUR_ABSOLUTE_PATH_HERE'
        }]
    };
};

exports.getACLId = function() {
    return 'ACL_ID_HERE';
};

exports.getAccessRuleDocument = function() {
    return {
        'DATA_TYPE': 'access',
        'principal_type': 'identity',
        'principal': 'USER_UUID_HERE',
        'path': '/',
        'permissions': 'r',
        'notify_email': 'user_email@example.edu',
    };
};

exports.getAccessDocument = function() {
  return {
    "DATA_TYPE": "access",
    "id": 'ACL_ID_HERE',
    "role_id": null,
    "principal_type": "identity",
    "principal": "USER_UUID_HERE",
    "path": "/~/output.out",
    "permissions": "rw",
    "notify_email": "user_email@example.edu"
  };
};
