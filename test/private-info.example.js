
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
 */

exports.getBearerToken = function() {
  return 'YOUR_BEARER_TOKEN_HERE';
}

exports.getEndPointId = function() {
  return 'YOUR_ENDPOINT_ID_HERE';
}
