import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Actions, ActionType, StateType } from "../types";
import { getLocalStorageItem } from "../utils/persistence";

const initialState: StateType = getLocalStorageItem("pros-cons", {
  pros: [{ id: Date.now(), text: "" }],
  cons: [{ id: Date.now(), text: "" }],
});

const ListContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => undefined });

const listReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case Actions.ADD_ITEM:
      return {
        ...state,
        [action.payload.listType]: [
          ...state[action.payload.listType],
          {
            id: Date.now(),
            text: "",
          },
        ],
      };
    case Actions.EDIT_ITEM:
      return {
        ...state,
        [action.payload.listType]: state[action.payload.listType].map((item) =>
          item.id === action.payload.id
            ? { ...item, text: action.payload.text }
            : item
        ),
      };
    case Actions.DELETE_ITEM:
      const updatedList = state[action.payload.listType].filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        [action.payload.listType]: updatedList,
      };
    default:
      return state;
  }
};

export const ListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => useContext(ListContext);
