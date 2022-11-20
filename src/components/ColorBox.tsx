import DrawPad from "./DrawPad";
import { useState } from "react";
import cls from "classnames";
import { Item } from "../utils/type";

const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500"];
export default function ColorBox() {
  const [color, setColor] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);

  const createNewItem = () => {
    const newItem = {
      position: {
        x: Math.random(),
        y: Math.random(),
      },
      color: color || "bg-red-500",
      order: items.length ? items[items.length - 1].order + 1 : 1,
    };
    setItems([...items, newItem]);
    setSelected(newItem);
  };

  const deleteSelectedItem = () => {
    if (selected) {
      const temArr = [...items];
      temArr.splice(
        items.findIndex((item) => item.order === selected.order),
        1
      );
      setItems(temArr);
      setSelected(null);
    }
  };

  const clearAll = () => {
    setSelected(null);
    setColor(null);
    setItems([]);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-66 bg-gray-50 p-8 flex flex-col">
        <div className="flex gap-x-4">
          <div
            className="border border-gray-800 w-12 h-12 flex justify-center cursor-pointer select-none hover:bg-green-100"
            onClick={() => createNewItem()}
            data-cy="plus-button"
          >
            <span className="text-4xl">+</span>
          </div>
          <div
            onClick={() => deleteSelectedItem()}
            className="border border-gray-800 w-12 h-12 flex justify-center cursor-pointer select-none hover:bg-green-100"
            data-cy="minus-button"
          >
            <span className="text-5xl">-</span>
          </div>
        </div>
        <div className="mt-8 flex gap-x-4">
          {colors.map((col, i) => (
            <div
              data-cy="box-with-color"
              key={i}
              className={cls(
                "w-12 h-12 cursor-pointer hover:border-green-200",
                col,
                col === color ? "border-2 border-gray-800" : ""
              )}
              onClick={() => setColor(col)}
            ></div>
          ))}
        </div>
        <div className="mt-auto mb-8 mx-auto" data-cy="count-selected-elements">
          <span className="text-2xl">{items.length} Elements </span>
        </div>
        <div
          data-cy="clear-all-button"
          onClick={() => clearAll()}
          className="cursor-pointer h-12 px-4 select-none border border-gray-800 flex items-center justify-center hover:bg-green-100"
        >
          Clear
        </div>
      </div>
      <DrawPad items={items} selectItem={setSelected} selected={selected} />
    </div>
  );
}
