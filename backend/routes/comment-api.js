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

router.post('/comment/create/:id', (req, res) => {
    var newcomment = new comments(req.body);
    newcomment.save(async(err, result) => {
        if (err) {
            console.log("error occured in project");
            res.send("error occured");
            res.status(400);
        } else {
            console.log(result);
            await issues.findByIdAndUpdate(req.params.id, {
                $push: {
                    "comments": newcomment._id
                }
            });

            res.status(200);
            res.json({ "message": "New comment Created Successfully" });
        }
    });
})

module.exports = router;