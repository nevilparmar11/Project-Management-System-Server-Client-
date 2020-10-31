const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const db = "mongodb://localhost:27017/pms";

//models
const users = require('../models/user');
const admins = require('../models/admin');
const projectManagers = require('../models/project-manager');
const projects = require('../models/projects');
const issues = require('../models/issues');
const comments = require('../models/comments');

mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});

router.get('/project/:id', async(req, res) => {
    console.log(req.params.id);
    var result = await projects.findById(req.params.id).populate([{
        path: 'admin pm issues users',
        populate: {
            path: 'comments',
            model: 'comments',
        }
    }]);
    res.send(result);
})

router.post('/project/update/:id', (req, res) => {
    console.log(req.params.id);
    var newUpdatedDoc = JSON.parse(JSON.stringify(req.body))
    projects.findOneAndUpdate({ "_id": req.params.id.toString() }, newUpdatedDoc, { new: true },
        function(err, result) {
            if (err) {
                console.log("error occured in project");
                res.send("error occured")
            } else if (!result) {
                res.send("No Project Found")
            } else {
                console.log(result);
                res.json(result);
            }
        });
})

module.exports = router;