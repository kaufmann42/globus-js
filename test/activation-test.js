var assert = require('chai').assert,
    privateInfo = require('./private-info'),
    bearerToken = privateInfo.getBearerToken(),
    endpointId = privateInfo.getEndPointId(),
    activation_requirements_document = privateInfo.getActivationRequirementsDocument(),
    activation = require('../globus');

describe('Get Activation Requirements', function() {
    it('should return activation requirements', function() {
        activation.getActivationRequirements(bearerToken, endpointId).then(function(obj) {
            obj.should.not.have.property('code');
        });
    });

    it('should fail when given a false activation bearerToken', function() {
        activation.getActivationRequirements('', endpointId).then(function(obj) {
            obj.should.have.property('code');
        });
    });

    it('should fail when given a false endpointId', function() {
        activation.getActivationRequirements('', endpointId).then(function(obj) {
            obj.should.have.property('code');
        });
    });
});

// TODO: before each test ensure the endpoint is either activated or deactivated...
describe('Activate Endpoint', function() {
    it('should return a successful activation', function() {
        activation.activateEndpoint(bearerToken, endpointId, activation_requirements_document).then(function(obj) {
            obj.should.have.property('code', 'Activated.MyProxyCredential');
        });
    });

    it('should fail when given a bad password', function() {
        activation_requirements_document.DATA[3].value = null;
        activation.activateEndpoint(bearerToken, endpointId, activation_requirements_document).then(function(obj) {
            obj.should.have.property('code', 'ClientError.BadRequest');
        });
    });
});

describe('Deactivate Endpoint', function() {
    it('should return a successful deactivation', function() {
        activation.deactivateEndpoint(bearerToken, endpointId).then(function(obj) {
            obj.should.have.property('code', 'Deactivated');
        });
    });

    it('should return non-active if already de-activated', function() {
        activation.deactivateEndpoint(bearerToken, endpointId).then(function(obj) {
            obj.should.have.property('code', 'NotActivated');
        });
    });

    it('should return an error if endpointId non-existent', function() {
        activation.deactivateEndpoint(bearerToken, 'badCode').then(function(obj) {
            obj.should.have.property('code', 'ClientError.NotFound');
        });
    });
});
