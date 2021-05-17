import React, { createContext, useReducer } from "react";

const initialState = {
  user: { firstname: "Bella", lastname: "Mercer", sex: "Female", age: "22" },
  conditions: [],
  symptoms: [],
  recent: "",
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "user":
        return { ...state, user: { ...action.payload } };

      case "conditions":
        return { ...state, conditions: action.payload };

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
