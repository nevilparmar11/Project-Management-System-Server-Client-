const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    url: String,
    description: String,
    category: String,
    createdAt: String,
    updateAt: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admins",
    },
    pm: {
        type: Schema.Types.ObjectId,
        ref: "projectmanagers",
    },
    issues: [{
        type: Schema.Types.ObjectId,
        ref: 'issues',
    }],
    users: [{ // here users referes to the multiple assignees of the ongoing project
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
}, {
    collection: "projects"
});

module.exports = mongoose.model('projects', projectSchema, 'projects');