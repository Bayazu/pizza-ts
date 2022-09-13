import React, { FC, useEffect, useRef } from "react";
import Categories from "../components/Categories";
import Sort, { sortingNames } from "../components/Sort";
import { Link, useNavigate } from "react-router-dom";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectSort,
  setCategoryId,
  setFilters,
  setPage,
  setSortType,
  TSetFilters,
  TSort,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector(selectPizzaData);
  const sortType = useSelector(selectSort);
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const onClickSort = (data: TSort) => {
    dispatch(setSortType(data));
  };

  const setPageCount = (data: number) => {
    dispatch(setPage(data));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    dispatch(
      fetchPizzas({
        category,
        currentPage: currentPage.toString(),
        sort: sortType.sort,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingNames.find((item) => item.sort === params.sort);

      const objToDispatch: TSetFilters = {
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        // @ts-ignore
        sort: sort,
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
        currentPage: currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  // Вариант для статики
  const pizzas = items
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((el: any) => <PizzaBlock key={el.id} {...el} />);
  //const pizzas = items.map((el) => <Index key={el.id} {...el} />);

  const skeletons = [...new Array(10)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

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
        value={currentPage}
        onChangePage={(number: number) => setPageCount(number)}
      />
    </div>
  );
};

export default Home;
