import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout, setNotes } from "./store";
import { Link } from "react-router-dom";

const Home = ({ auth, logout, notes, setNotes }) => {
  useEffect(() => {
    setNotes();
  }, []);
  return (
    <div>
      Welcome {auth.username}
      <button onClick={logout}>Logout</button>
      <div>
        You have added {notes.length} notes.
        <br />
        <Link to="/notes">Access and Add Notes</Link>
      </div>
    </div>
  );
};

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    setNotes: () => dispatch(setNotes()),
  };
};

export default connect(mapState, mapDispatch)(Home);
