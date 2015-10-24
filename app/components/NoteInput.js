var React = require('react');


var NoteInput = React.createClass({

    getInitialState: function() {
        return {
            value: ''
        }
    },

    handleClick: function() {
        var newNote = this.refs.note.value;
        this.refs.note.value = '';
        this.props.onSave(newNote);
    },

    render: function() {
        return (
            <div>
                <input type="text" placeholder="Add a note!" ref="note" />
                <button className="btn-add" onClick={this.handleClick}> Add </button>
            </div>
        );
    }
});

module.exports = NoteInput;