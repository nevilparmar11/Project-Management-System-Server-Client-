const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    id: String,
    title: String,
    type: String,
    status: String,
    priority: String,
    listPosition: Number,
    description: String,
    estimate: Number,
    timeSpent: Number,
    timeRemaining: Number,
    createdAt: String,
    updatedAt: String,
    reporterId: String,
    userIds: [{
        type: String,
    }],
    comments: [{
        type: String,
    }],
    projectId: String,
}, {
    collection: "issues"
});

module.exports = mongoose.model('issues', issueSchema, 'issues');