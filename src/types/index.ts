export type ListItem = {
  id: number;
  text: string;
  number?: number;
};

export type StateType = {
  pros: ListItem[];
  cons: ListItem[];
};

export type ListType = "pros" | "cons";

export type ActionType =
  | { type: "ADD_ITEM"; payload: { listType: "pros" | "cons" } }
  | {
      type: "EDIT_ITEM";
      payload: { listType: "pros" | "cons"; id: number; text: string };
    }
  | { type: "DELETE_ITEM"; payload: { listType: "pros" | "cons"; id: number } };

export enum Actions {
  ADD_ITEM = "ADD_ITEM",
  EDIT_ITEM = "EDIT_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
}
