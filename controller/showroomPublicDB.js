var express = require('express');
var app = express();
let middleware = require('./middleware.js');

var showroomPublic = require('../model/showroomPublicModel.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false });

app.get('/api/showRandomCarousel', function (req, res) {
    showroomPublic.showRandomCarousel()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve showroom categories"
            });
        })
})

app.get('/api/showShowroomByCategory', function (req, res) {
    const category = req.query.category || 'all';
    showroomPublic.showShowroomByCategory(category)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve showrooms"
            });
        });
})

app.get('/api/showShowroomBySearch', function (req, res) {
    const searchTerm = req.query.q || ''; // get ?q=searchTerm 

    showroomPublic.searchShowroomByName(searchTerm)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Failed to search showrooms"
            });
        });
});

app.get('/api/getFurnitureCategory', function (req, res) {
    showroomPublic.showFurnitureCategory()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve furniture categories"
            });
        })
})

module.exports = app;