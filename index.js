
require('dotenv').config();
const express = require('express');
const port = process.env.port || 3000;
const app = express();
const passportJwt = require('./config/passport_jwt');
const URL = require('./config/mongoose');
const router = require('./routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/',router);

app.listen(port, (err) => {
    if (err) {
        console.log('Error While Connecting To Server', err);
        return;
    }
    console.log('Server Connected On Port', port);
});