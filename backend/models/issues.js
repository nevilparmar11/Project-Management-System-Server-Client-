const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
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
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    userIds: [{ // here userIds referes to the multiple assignees of the ongoing issue
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
}, {
    collection: "issues"
});

module.exports = mongoose.model('issues', issueSchema, 'issues');