
var express = require('express');
var app = express();

app.use(express.static('test'));

app.listen(3333);

