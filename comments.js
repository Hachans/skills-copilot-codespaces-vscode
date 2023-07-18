//Create web server
var express = require('express');
var router = express.Router();
//Create database connection
var db = require('../db');
//Create SQL statement
var sql = 'SELECT * FROM comments';
//Create GET API
router.get('/', function(req, res, next) {
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json(data);
    });
});
//Create POST API
router.post('/', function(req, res, next) {
    var comment = req.body;
    var sql = `INSERT INTO comments (name, email, comment, date) VALUES ("${comment.name}", "${comment.email}", "${comment.comment}", "${comment.date}")`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
            status: 'success',
            message: 'Comment added successfully'
        });
    });
});
//Create DELETE API
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = `DELETE FROM comments WHERE id = ${id}`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
            status: 'success',
            message: 'Comment deleted successfully'
        });
    });
});
//Create PUT API
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var comment = req.body;
    var sql = `UPDATE comments SET name="${comment.name}", email="${comment.email}", comment="${comment.comment}", date="${comment.date}" WHERE id = ${id}`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
            status: 'success',
            message: 'Comment updated successfully'
        });
    });
});
//Export router
module.exports = router;