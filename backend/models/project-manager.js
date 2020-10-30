const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectmanagerSchema = new Schema({
    id: String,
    email: String,
    createdAt: String,
    updateAt: String,
    avatarUrl: String,
    password: String,
}, {
    collection: "projectmanagers"
});

module.exports = mongoose.model('projectmanagers', projectmanagerSchema, 'projectmanagers');