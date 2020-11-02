const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//models
const users = require('../models/user');
const admins = require('../models/admin');
const projectManagers = require('../models/project-manager');
const projects = require('../models/projects');
const issues = require('../models/issues');
const comments = require('../models/comments');


const jwt = require('jsonwebtoken')
const db = "mongodb://localhost:27017/pms";
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new users(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    console.log(userData.email);
    console.log(userData.password);
    users.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid Password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                    // res.status(200).send({ token, user })
                res.status(200).send({ token, user })
            }
        }
    })
})


router.get('/:id', (req, res) => {
    let userData = req.params;

    console.log(userData.id);
    users.findById(userData.id, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else {
                console.log("inside fetch by id user");
                res.status(200).send({ user })
            }
        }
    })
})

module.exports = router;