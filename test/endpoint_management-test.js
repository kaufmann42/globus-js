var assert = require('chai').assert,
    privateInfo = require('./private-info'),
    bearerToken = privateInfo.getBearerToken(),
    endpoint_xid = privateInfo.getEndpointId(),
    endpoint_document = privateInfo.getEndpointDocument(),
    g = require('../globus');

describe('Get An Endpoint By Id', function() {
  it('should return an endpoint_document', function() {
      g.getEndpointById(bearerToken, endpoint_xid).then(function (obj) {
        obj.should.have.property('DATA_TYPE', 'endpoint');
      });
  });
});

// TODO: create some server documents and then test with them...
// describe('Create An Endpoint', function() {
//   it('should create an endpoint and return an id', function() {
//     g.createEndpoint().then(function (obj) {
//       obj.should.have.property('DATA_TYPE', 'endpoint');
//     });
//   });
// });

describe('Create A Shared Endpoint', function() {
  it('should create a shared endpoint and return an id', function() {
    g.createSharedEndpoint(bearerToken, 'Testing Shared Endpoint', endpoint_document.host_endpoint_id, endpoint_document.path, endpoint_document.description, endpoint_document.organization).then(function(obj) {
      obj.should.have.property('DATA_TYPE', 'endpoint');
    });
  });
});
