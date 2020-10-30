const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    id: String,
    email: String,
    createdAt: String,
    updateAt: String,
    avatarUrl: String,
    password: String,
}, {
    collection: "admins"
});

module.exports = mongoose.model('admins', adminSchema, 'admins');