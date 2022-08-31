import React, { useContext, useEffect, useRef } from "react";
import Categories from "../components/Categories";
import Sort, { sortingNames } from "../components/Sort";
import { Link, useNavigate } from "react-router-dom";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectSort,
  setCategoryId,
  setFilters,
  setPage,
  setSortType,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector(selectPizzaData);
  const sortType = useSelector(selectSort);
  const { categoryId, pagination, searchValue } = useSelector(selectFilter);

  console.log(searchValue);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (data) => {
    dispatch(setSortType(data));
  };

  const setPageCount = (data) => {
    dispatch(setPage(data));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    dispatch(
      fetchPizzas({
        category,
        currentPage: pagination.currentPage,
        limit: pagination.limit,
        sort: sortType.sort,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingNames.find((item) => item.sort === params.sort);
      const objToDispatch = {
        categoryId: params.categoryId,
        currentPage: params.currentPage,
        sort,
      };
      dispatch(setFilters(objToDispatch));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortType.sort,
        categoryId,
        currentPage: pagination.currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, pagination]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, pagination]);

  // Вариант для статики
  const pizzas = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((el) => <PizzaBlock key={el.id} {...el} />);
  //const pizzas = items.map((el) => <PizzaBlock key={el.id} {...el} />);

  const skeletons = [...new Array(10)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  console.log(status);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort sortType={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы.Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        value={pagination.currentPage}
        onChangePage={(number) => setPageCount(number)}
      />
    </div>
  );
};

export default Home;
