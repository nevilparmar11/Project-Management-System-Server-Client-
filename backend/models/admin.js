const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const now = new Date();

const adminSchema = new Schema({
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
}, {
    collection: "admins"
});

module.exports = mongoose.model('admins', adminSchema, 'admins');