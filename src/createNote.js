import React, { Component } from "react";
import { createNote } from "./store/index";
import { connect } from "react-redux";

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createNote({ ...this.state });
    this.setState({ text: "" });
  }

  render() {
    const { text } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          name="text"
          value={text}
          placeholder="add a note"
          onChange={handleChange}
        ></textarea>
        <button disabled={!text} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (note) => dispatch(createNote(note)),
  };
};

export default connect((state) => state, mapDispatchToProps)(CreateNote);
