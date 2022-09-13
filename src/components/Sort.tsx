import React, { FC, useEffect, useRef, useState } from "react";
import { TSort } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sort: string;
};
type SortProps = {
  sortType: {
    name: string;
    sort: string;
  };
  onClickSort: (obj: TSort) => void;
};

export const sortingNames: SortItem[] = [
  { name: "популярности", sort: "rating" },
  { name: "цене", sort: "price" },
  { name: "алфавиту", sort: "title" },
];

const Sort: FC<SortProps> = ({ sortType, onClickSort }) => {
  const [visible, setVisible] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const changeSortingNames = (obj: TSort) => {
    onClickSort(obj);
    setVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event);

      const _event = event as MouseEvent & {
        path: Node[];
      };

      console.log(_event.path);

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisible((prevState) => !prevState)}>
          {sortType.name}
        </span>
      </div>

      {visible && (
        <div className="sort__popup">
          <ul>
            {sortingNames.map((obj, index) => (
              <li
                className={sortType.sort === obj.sort ? "active" : ""}
                // @ts-ignore
                onClick={() => changeSortingNames(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;