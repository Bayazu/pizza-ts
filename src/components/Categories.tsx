import React, { FC } from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
};

const Categories: FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            className={categoryId === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
