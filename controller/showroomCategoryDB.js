var express = require('express');
var app = express();
let middleware = require('./middleware.js');

var showroom = require('../model/showroomCategoryModel.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false });

app.post('/api/addShowroomCategory',
    jsonParser,
    function (req, res) {

        showroom.addShowroomCategory(req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send("Failed to add showroom category");
            });
    }
);

module.exports = app;