var assert = require('chai').assert,
    privateInfo = require('./private-info'),
    bearerToken = privateInfo.getBearerToken(),
    endpointId = privateInfo.getEndPointId(),
    task_submit = require('../globus'),
    transferDocument = privateInfo.getTransferDocument(),
    deletionDocument = privateInfo.getDeleteDocument();

describe('Get Submission Id', function() {
    it('should return submission id successfully', function() {
        task_submit.getSubmissionId(bearerToken).then(function(obj) {
            obj.should.not.have.property('value');
        });
    });

    it('should return error response when given faulty bearer token', function() {
        task_submit.getSubmissionId('bad_code').then(function(obj) {
            obj.should.not.have.property('value');
        });
    });
});

describe('Submit A Transfer Task', function() {
    it('should return a successful transfer request response', function() {
        task_submit.submitTransferTask(bearerToken, transferDocument.submission_id, transferDocument.label, transferDocument.notify_on_succeeded, transferDocument.notify_on_failed, transferDocument.notify_on_inactive, transferDocument.source_endpoint, transferDocument.destination_endpoint, transferDocument.DATA, transferDocument.encrypt_data, transferDocument.sync_level, transferDocument.verify_checksum, transferDocument.preserve_timestamp, transferDocument.delete_destination_etransferDocumenttra).then(function(obj) {
            obj.should.have.property('code', 'Accepted');
        });
    });
});

describe('Submit A Deletion Task', function() {
    it('should return a successful deletion request response', function() {
        task_submit.submitDeletionTask(bearerToken, deletionDocument.endpoint, deletionDocument.DATA, deletionDocument.recursive, deletionDocument.ignore_missing, deletionDocument.interpret_globs).then(function(obj) {
            obj.should.have.property('code', 'Accepted');
        });
    });
});
