import React, { useState } from "react";
import { useListContext } from "../store/ListContext";
import ListItem from "./ListItem";

type ListProps = {
  title: string;
  listType: "pros" | "cons";
};

const List: React.FC<ListProps> = ({ title, listType }) => {
  const { state, dispatch } = useListContext();
  const items = state[listType];
  const [focusIndex, setFocusIndex] = useState(items.length - 1);

  const handleEnterPress = (index: number) => {
    const currentItem = items[index];
    const isLastItem = index === items.length - 1;

    if (isLastItem && currentItem.text.trim() !== "") {
      dispatch({ type: "ADD_ITEM", payload: { listType } });
    } else if (currentItem.text.trim() !== "") {
      setFocusIndex(index + 1);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          id={item.id}
          text={item.text}
          number={index + 1}
          listType={listType}
          shouldFocus={focusIndex === index}
          onEnterPress={() => handleEnterPress(index)}
        />
      ))}
    </div>
  );
};

export default List;
