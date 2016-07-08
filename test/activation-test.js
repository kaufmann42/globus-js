var assert = require('chai').assert,
    privateInfo = require('./private-info'),
    bearerToken = privateInfo.getBearerToken(),
    endpointId = privateInfo.getEndPointId(),
    activation = require('../modules/globus-activation');

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
  })
});

describe('Activate Endpoint', function() {
  it('should activate a given endpoint', function() {
    activation.activateEndpoint().then(function(obj) {

    })
  });
});
