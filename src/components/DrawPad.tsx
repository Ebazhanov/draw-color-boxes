import { useEffect, useRef, useState } from "react";
import cls from "classnames";
import { Item } from "../utils/type";

type PadProps = {
  items: Item[];
  selectItem: (item: Item) => void;
  selected: Item | null;
};

export default function DrawPad({ items, selectItem, selected }: PadProps) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapRef.current)
      setSize({
        height: wrapRef.current.clientHeight,
        width: wrapRef.current.clientWidth,
      });
  }, []);

  return (
    <div className="flex-1 p-12 max-h-screen max-w-full" data-cy="draw-pad">
      <div className="relative w-full h-full" ref={wrapRef}>
        {items.map((item) => (
          <div
            data-cy="color-box"
            key={item.order}
            onClick={() => selectItem(item)}
            className={cls(
              "w-52 h-52 absolute cursor-pointer flex items-center justify-center select-none",
              item.color,
              selected?.order === item.order
                ? "border-2 border-gray-800"
                : "border border-gray-300"
            )}
            style={{
              top: item.position.y * size.height,
              left: item.position.x * size.width,
              zIndex: selected?.order === item.order ? 999 : item.order,
            }}
          >
            <span className="text-9xl">{item.order}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
