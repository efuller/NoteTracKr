var express = require('express');
var router = express.Router();
var Note = require('../app/models/note.js');

router.route('/notes')

    .post(function(req, res) {

        var note = new Note();
        note.note = req.body.note;

        note.save(function(err) {
            if ( err ) {
                res.send( err );
            }
            res.json({note: note.note});

        });
    })

    .get(function(req, res) {

        Note.find(function(err, notes) {
            if ( err )
                res.send( err );

            res.json(notes);
        })
    });

router.route('/notes/:note_id')

    .get(function(req, res) {
        Note.findById(req.params.note_id, function(err, note) {
            if (err)
                res.send(err);

            res.json(note);
        });
        req.end();
    })

    .put(function(req, res) {
        Note.findById(req.params.note_id, function(err, note) {
            if ( err )
                res.send(err);

            note.note = req.body.note;

            note.save(function(err) {
                if ( err )
                    res.send(err);

                res.json({message: 'Note Update!'});
            });
        });
    })

    .delete(function(req, res) {
        Note.remove({
            _id: req.params.note_id
        }, function(err, note) {
            if ( err )
                res.send(err);

            res.json({message: 'Successfully delete'});
        });
    });

module.exports = router;