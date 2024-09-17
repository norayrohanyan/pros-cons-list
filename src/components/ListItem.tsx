import React, { useEffect, useRef } from "react";
import { useHandleInput } from "../hooks/useHandleInput";

type ListItemProps = {
  id: number;
  text: string;
  number: number;
  listType: "pros" | "cons";
  shouldFocus: boolean;
  onEnterPress: () => void;
};

const ListItem: React.FC<ListItemProps> = ({
  id,
  text,
  number,
  listType,
  shouldFocus,
  onEnterPress,
}) => {
  const { handleChange } = useHandleInput(listType);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div>
      <span>{number}.</span>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => handleChange(id, e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Type a ${listType.slice(0, -1)} and press Enter`}
      />
    </div>
  );
};

export default ListItem;
