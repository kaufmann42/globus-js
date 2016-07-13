var assert = require('chai').assert,
    privateInfo = require('./private-info'),
    bearerToken = privateInfo.getBearerToken(),
    endpoint_xid = privateInfo.getEndpointId(),
    id = privateInfo.getACLId(),
    activation_requirements_document = privateInfo.getActivationRequirementsDocument(),
    access_document = privateInfo.getAccessRuleDocument(),
    acl = require('../globus');

describe('Get Access Rules List', function() {
    it('should return a list of access rules in the ACL for', function() {
        acl.getAccessRulesList(bearerToken, endpoint_xid).then(function(obj) {
            obj.should.not.have.property('code');
        });
    });
});

describe('Get An Access Rule By Id', function() {
    it('should return access rules for a specific endpoint', function() {
        acl.getAccessRulesListById(bearerToken, endpoint_xid, id).then(function(obj) {
            obj.should.not.have.property('code');
        });
    });
});

describe('Create A New Access Rule', function() {
    it('should create a new access rule for a specific endpoint', function() {
        acl.createAccessRule(bearerToken, endpoint_xid, access_document.principal, access_document.path, access_document.permissions, access_document.notify_email).then(function(obj) {
            obj.should.have.property('code', 'Created');
        });
    });
});

describe('Update An Access Rule', function() {
    it('should update an existing access rule for a specific endpoint', function() {
        acl.updateAccessRule(bearerToken, endpoint_xid, access_document.id, access_document.role_id, access_document.principal_type, access_document.principal, access_document.path, access_document.permissions).then(function(obj) {
            obj.should.have.property('code', 'Updated');
        });
    });
});

describe('Delete An Access Rule', function() {
    it('should delete an existing access rule for a specific endpoint', function() {
        acl.deleteAccessRule(bearerToken, endpoint_xid, access_document.id).then(function() {
            obj.should.have.property('code', 'Deleted');
        });
    });
});
