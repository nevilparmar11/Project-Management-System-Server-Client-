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

router.post('/issue/create/:id', (req, res) => {
    var newIssue = new issues(req.body);
    newIssue.save(async(err, result) => {
        if (err) {
            console.log("error occured in issue create");
            res.send("error occured");
            res.status(400);
        } else {
            console.log(result);
            res.status(200);
            await projects.findByIdAndUpdate(req.params.id, {
                $push: {
                    "issues": newIssue._id
                }
            });
            res.json({ "message": "New Issue Created Successfully" });
        }
    });
})

router.post('/issue/update/:id', (req, res) => {
    console.log(req.params.id);
    var newUpdatedDoc = JSON.parse(JSON.stringify(req.body))
    issues.findOneAndUpdate({ "_id": req.params.id.toString() }, newUpdatedDoc, { new: true },
        function(err, result) {
            if (err) {
                console.log("error occured in issue");
                res.send("error occured")
            } else if (!result) {
                res.send("No Issue Found")
            } else {
                console.log(result);
                res.json(result);
            }
        });
})

router.post('/issue/delete/:pid/:iid', (req, res) => {
    issues.findOneAndRemove({ "_id": req.params.iid },
        async(err, result) => {
            if (err) {
                res.status(400);
                res.send("Unable to find an Issue");
            } else {
                console.log(result);
                res.status(200);
                await projects.findByIdAndUpdate(req.params.pid, {
                    $pull: {
                        "issues": result._id
                    }
                });

                await comments.remove({
                    "issueId": req.params.iid
                });

                res.json({ "message": "New Issue Removed Successfully" });
            }
        });
})

module.exports = router;