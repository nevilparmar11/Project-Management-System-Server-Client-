const mongoose = require('mongoose');
const UserModel = require('./user');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: String,
    createdAt: String,
    updatedAt: String,
    issueId: {
        type: Schema.Types.ObjectId,
        ref: 'issues'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    // mapped to display by userId, It is actual from the users table
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    }
}, {
    collection: "comments"
});

module.exports = mongoose.model('comments', commentSchema, 'comments');