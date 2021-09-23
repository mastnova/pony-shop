import { useContext } from 'react';
import Pagination from '../../features/Pagination/Pagination';
import ProductCard from '../../features/ProductCard/ProductCard';
import { AppDispatch } from '../../App';
import styles from './Showcase.module.css';

export default function Showcase({ products, currentPage, itemsPerPage }) {
  const dispatch = useContext(AppDispatch);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const productsOnPage = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.showcase}>
      <div className={styles.content}>
        {
          productsOnPage.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              handler={() => dispatch({ type: 'add_product', payload: product })}
            />
          ))
        }
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={products.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChange={page => dispatch({ type: 'change_page', payload: page })}
        />
      </div>
    </div>
  );
}