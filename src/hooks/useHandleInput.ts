import { useCallback, useEffect } from "react";
import { useListContext } from "../store/ListContext";
import { saveLocalStorageItem } from "../utils/persistence";
import { ListType, Actions } from "../types";

export const useHandleInput = (listType: ListType) => {
  const { state, dispatch } = useListContext();

  useEffect(() => {
    saveLocalStorageItem("pros-cons", state);
  }, [state]);

  const handleChange = useCallback(
    (id: number, text: string) => {
      if (text.trim() === "") {
        dispatch({ type: Actions.DELETE_ITEM, payload: { listType, id } });
      } else {
        dispatch({ type: Actions.EDIT_ITEM, payload: { listType, id, text } });
        const isLastItem =
          id === state[listType][state[listType].length - 1].id;
        if (isLastItem && text.trim().length > 0) {
          dispatch({ type: Actions.ADD_ITEM, payload: { listType } });
        }
      }
    },
    [dispatch, listType, state]
  );

  return { handleChange };
};
