const express = require('express');
const morgan = require('morgan');
const userRouters = require('./routes/user.route');
const repairRouters = require('./routes/repair.route');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRouters);
app.use('/api/v1/repairs', repairRouters);

module.exports = app;
