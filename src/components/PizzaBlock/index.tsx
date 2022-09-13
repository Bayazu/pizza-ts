import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  selectCartItemById,
  TCartItem,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const pizzasTypes = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: string;
  sizes: number[];
  price: number;
  title: string;
  types: number[];
  imageUrl: string;
};

const PizzaBlock: FC<PizzaBlockProps> = ({
  id,
  sizes,
  price,
  title,
  types,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const [pizzaIndexSize, setIndexPizzaSize] = useState<number>(0);
  const [pizzaIndexType, setIndexPizzaType] = useState<number>(0);

  const onClickAdd = () => {
    const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      type: pizzasTypes[pizzaIndexType],
      size: sizes[pizzaIndexSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  const availablePizzaTypes = types.map((el, index) => {
    return pizzasTypes[index];
  });

  const setPizzaSize = (index: number) => {
    setIndexPizzaSize(index);
  };

  const setPizzaType = (index: number) => {
    setIndexPizzaType(index);
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {availablePizzaTypes.map((el, index) => (
              <li
                // @ts-ignore
                className={index === pizzaIndexType ? "active" : null}
                key={index}
                onClick={() => {
                  setPizzaType(index);
                }}
              >
                {el}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((sizePizza, index) => (
              <li
                key={index}
                // @ts-ignore
                className={index === pizzaIndexSize ? "active" : null}
                onClick={() => setPizzaSize(index)}
              >
                {sizePizza}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            //onClick={() => addPizza()}
            className="button button--outline button--add"
            onClick={() => onClickAdd()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
