import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "./store/index";
import CreateNote from "./createNote";

const Notes = ({ auth, notes, deleteNote }) => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>yoyoyo, this is {auth.username}'s note</div>
      <div>
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <p>{note.text}</p>
              <button onClick={() => deleteNote(note)}>Delete this Note</button>
            </div>
          );
        })}
      </div>
      <CreateNote />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (note) => dispatch(deleteNote(note)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Notes);
