import React, { useEffect, useReducer, useMemo } from 'react';
import Button from './components/Button/Button';
import BasketModal from './modals/BasketModal/BasketModal';
import FiltersModal from './modals/FiltersModal/FiltersModal';
import Showcase from './pages/Showcase/Showcase';
import { generatePonies, applyFilters } from './utils';
import styles from './App.module.css';

const products = generatePonies(60);

const basket = localStorage.getItem('basket');

const initialState = {
  basket: basket ? JSON.parse(basket) : [],
  currentPage: 1,
  itemsPerPage: 20,
  filters: {
    color: '',
    kind: '',
    minPrice: 0,
    maxPrice: 1000,
    onlyNew: false,
  },
  showFilters: false,
  showBasket: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'add_product':
      return { ...state, basket: [...state.basket, action.payload] };
    case 'remove_product':
      return { ...state, basket: state.basket.filter(item => item.id !== action.payload) };
    case 'clear_basket':
      return { ...state, basket: [] };
    case 'change_page':
      return { ...state, currentPage: action.payload };
    case 'change_filters':
      return { ...state, filters: action.payload };
    case 'show_filters':
      return { ...state, showFilters: action.payload };
    case 'show_basket':
      return { ...state, showBasket: action.payload };
    default:
      throw new Error();
  }
}

export const AppDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const filteredProducts = useMemo(() => applyFilters(state.filters, products), [state.filters]);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(state.basket));
  }, [state.basket]);

  return (
    <AppDispatch.Provider value={dispatch}>
      <div className={styles.app}>
        <div className={styles.topBar}>
          <Button
            onClick={() => dispatch({ type: 'show_filters', payload: true })}
            variant="link"
          >
            Фильтры
          </Button>
          <span>
            <Button
              onClick={() => dispatch({ type: 'show_basket', payload: true })}
              variant="link"
            >
              Корзина
            </Button>
            {!!state.basket.length && <span className="badge">{state.basket.length}</span>}
          </span>
        </div>
        <Showcase
          products={filteredProducts}
          currentPage={state.currentPage}
          itemsPerPage={state.itemsPerPage}
        />
        <FiltersModal
          show={state.showFilters}
          initialFilters={state.filters}
        />
        <BasketModal
          show={state.showBasket}
          products={state.basket}
        />
      </div>
    </AppDispatch.Provider>
  );
}

export default App;
