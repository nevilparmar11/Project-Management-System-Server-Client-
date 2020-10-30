const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
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
    newIssue.save(function(err, result) {
        if (err) {
            console.log("error occured in project");
            res.send("error occured");
            res.status(400);
        } else {
            console.log(result);
            res.stats(200);
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

router.post('/issue/delete/:id', (req, res) => {
    issues.findOne({ _id: req.params.id }, function(err, itm) {
        if (err) {
            res.status(400);
            res.send("Unable to find an Issue");
        } else {
            itm.deleteOne(function(err) {
                if (err) {
                    console.log("Unable to remove an Issue");
                    res.status(400);
                    res.send("Unable to remove an issue");
                }
                console.log("Issue removed!");
                res.json({ "message": "Issue removed!" });
            });
        }
    });
})

module.exports = router;