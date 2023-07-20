// Create web server

// Import library
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import model
const Comment = require('../models/comment');

// Create web server
const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

// Create GET method
commentRouter.get('/', (req, res, next) => {
    Comment.find({})
    .then((comments) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Create POST method
commentRouter.post('/', (req, res, next) => {
    Comment.create(req.body)
    .then((comment) => {
        console.log('Comment created ', comment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Create PUT method
commentRouter.put('/', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments');
});

// Create DELETE method
commentRouter.delete('/', (req, res, next) => {
    Comment.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        }, (err) => next(err))
    .catch((err) => next(err));
});

// Create GET method with id
commentRouter.get('/:commentId', (req, res, next) => {
    Comment.findById(req.params.commentId)
    .then((comment) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Create POST method with id
commentRouter.post('/:commentId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /comments/' + req.params.commentId);
});

// Create PUT method with id
commentRouter.put('/:commentId', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.commentId, {
        $set: req.body
    }, { new