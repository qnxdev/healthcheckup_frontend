import React, { createContext, useReducer } from "react";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    sex: "",
    age: "",
    picture: "",
  },
  symptoms: [],
  recent: "",
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "init":
        return { ...action.payload };
      case "user":
        return { ...state, user: { ...action.payload } };

      case "symptoms":
        return { ...state, symptoms: action.payload };

      case "recent":
        return { ...state, recent: action.payload };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
