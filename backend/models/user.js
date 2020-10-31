const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const now = new Date();

const userSchema = new Schema({
    name: String,
    email: String,
    createdAt: {
        type: String,
        default: now.toISOString()
    },
    updateAt: {
        type: String,
        default: now.toISOString()
    },
    avatarUrl: { type: String, default: "../uploads/profilePics/default.png" },
    password: String,
    issueIds: [{
        type: String,
    }]
}, {
    collection: "users"
});

module.exports = mongoose.model('users', userSchema, 'users');