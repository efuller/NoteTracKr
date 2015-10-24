var React = require('react');

var RemoveNote = require('./RemoveNote');

var NoteList = React.createClass({

    handleOnRemove: function( noteKey ) {
      this.props.onRemove( noteKey );
    },

    render: function() {
        var self = this;
        var notes = this.props.notes.map(function(note, i) {
           return <li key={i}> {note.note} {<RemoveNote noteKey={i} noteID={note._id} onRemove={self.handleOnRemove} />}</li>
        });
        return (
            <div>
                <ul className="note-list">
                    {notes}
                </ul>
            </div>
        );
    }
});

module.exports = NoteList;