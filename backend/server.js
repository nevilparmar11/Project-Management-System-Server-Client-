const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const userApi = require('./routes/user-api');
const projectApi = require('./routes/project-api');
const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

app.use('/user-api', userApi);
app.use('/project-api', projectApi);

app.listen(port, function() {
    console.log("Server running on localhost:" + port);
});