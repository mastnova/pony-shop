import { useState, useEffect, useContext } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../features/Modal/Modal';
import { AppDispatch } from "../../App";
import { API } from '../../utils';
import styles from './BasketModal.module.css';

export default function BasketModal({ show, products }) {
  const dispatch = useContext(AppDispatch);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);
    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    }
  }, []);

  const totalPrice = products.reduce((total, product) => total + product.price, 0);
  const count = {};
  const productList = [];

  products.forEach(product => {
    if (count[product.id]) {
      count[product.id] += 1;
    } else {
      count[product.id] = 1;
      productList.push(product);
    }
  })

  const handleOrderClick = async () => {
    await API.createOrder({ products });
    dispatch({ type: 'clear_basket' });
    setIsOrderComplete(true);
  }

  const handleClose = () => {
    setIsOrderComplete(false);
    dispatch({ type: 'show_basket', payload: false });
  }

  let content;
  if (isOrderComplete) {
    content = (
      <div className={styles.content}>
        <p>Поздравляем с покупкой!</p>
        <Button variant="success" onClick={handleClose}>OK</Button>
      </div>
    );
  } else if (!products.length) {
    content = (
      <div className={styles.content}>
        <p>Тут пусто! Добавьте товар в корзину!</p>
        <Button variant="success" onClick={handleClose}>OK</Button>
      </div>
    );
  } else {
    content = (
      <div className={styles.content}>
        {
          productList.map(product => (
            <div className={styles.productRow} key={product.id}>
              <span><b>{product.name}</b> - {count[product.id]} шт.</span>
              <span>
                <span className={styles.productPrice}>
                  {product.price * count[product.id]} &#8381;
                </span>
                <Button
                  variant="danger"
                  onClick={() => dispatch({ type: 'remove_product', payload: product.id })}
                >
                  X
                </Button>
              </span>
            </div>
          ))
        }
        <div className={styles.summary}>
          <div>Количество: {products.length} шт.</div>
          <div>Итого: <b>{totalPrice} &#8381;</b></div>
        </div>
        <Button
          variant="action"
          onClick={handleOrderClick}
          disabled={!isOnline}
        >
          Купить
        </Button>
        {!isOnline && <div className={styles.alert}>Нет сети! Проверьте подключение к интернету</div>}
      </div>
    );
  }

  return (
    <Modal title="Корзина" show={show} onClose={handleClose}>
      {content}
    </Modal>
  );
}