var React = require('react');

var RemoveNote = React.createClass({

    handleRemove: function() {
        //console.log(this.props);
        //this.props.onRemove(this.props.noteKey);
        this.props.onRemove(this.props.noteID);
    },

    render: function() {
        return <button className="btn-remove" onClick={this.handleRemove}> X </button>
    }
});

module.exports = RemoveNote;