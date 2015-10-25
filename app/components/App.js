var $ = require('jquery');
var React = require('react');
var NoteInput = require('./NoteInput');
var NoteList = require('./NoteList');

var App = React.createClass({

    getInitialState: function() {
        return {
           notes: []
        }
    },

    componentDidMount: function() {
        $.ajax({
            url: 'api/notes',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({notes: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err.toString());
            }.bind(this)
        });
    },

    onSave: function(newNote) {

        var newNotes;

        $.ajax({
            type: 'POST',
            url: '/api/notes',
            data: { note: newNote }
        })
        .done(function(data) {
                console.log(this.state);
                newNotes = this.state.notes.concat([data]);

                this.setState({
                    notes: newNotes
                });
        }.bind(this))
        .fail(function(jqXhr) {
            console.log('This failed');
        }.bind(this));
    },

    onRemove: function( noteID ) {
        console.log(noteID);

        $.ajax({
            type: 'DELETE',
            url: '/api/notes/' + noteID,
        })
        .fail(function(jqXhr) {
                console.log('this failed');
        }.bind(this))
        .then(function(data) {
            return $.ajax({
                    url: 'api/notes',
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        this.setState({notes: data});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.log(err.toString());
                    }.bind(this)
                });
        }.bind(this));
    },

    render: function() {
        return(
            <div>
                <NoteInput onSave={this.onSave} />
                <NoteList notes={this.state.notes} onRemove={this.onRemove}/>
            </div>
        )
    }
});

module.exports = App;