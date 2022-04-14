import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

const notes = (state = [], action) => {
  if (action.type === "SET_NOTES") {
    return action.notes;
  }
  if (action.type === "DELETE_NOTE") {
    return [...state.filter((note) => note.id !== action.note.id)];
  }
  if (action.type === "CREATE_NOTE") {
    return [...state, action.newNote];
  }
  return state;
};

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

const logout = () => {
  window.localStorage.removeItem("token");
  return {
    type: "SET_AUTH",
    auth: {},
  };
};

const signIn = (credentials) => {
  return async (dispatch) => {
    let response = await axios.post("/api/auth", credentials);
    const { token } = response.data;
    window.localStorage.setItem("token", token);
    return dispatch(attemptLogin());
  };
};
const attemptLogin = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const setNotes = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/notes", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_NOTES", notes: response.data });
    }
  };
};

export const deleteNote = (note) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/notes/${note.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "DELETE_NOTE", note });
  };
};

export const createNote = (note) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const newNote = (
        await axios.post("/api/notes", note, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: "CREATE_NOTE", newNote });
    }
  };
};

const store = createStore(
  combineReducers({
    auth,
    notes,
  }),
  applyMiddleware(thunk, logger)
);

export { attemptLogin, signIn, logout };

export default store;
