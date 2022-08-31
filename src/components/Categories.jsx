import React, { useState } from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = ({ categoryId, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            className={categoryId === index ? "active" : null}
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
