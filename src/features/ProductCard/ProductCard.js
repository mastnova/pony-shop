import Button from '../../components/Button/Button';
import thumbnail from '../../images/thumbnail.png';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, handler }) {
  return (
    <div className={styles.card}>
      {product.is_new && <div className={styles.labelNew}>new</div>}
      <h3 className={styles.title}>{product.name}</h3>
      <div className={styles.subtitle}>{product.kind}</div>
      <img className={styles.thumbnail} src={thumbnail} alt="product thumbnail" />
      <div className={styles.subtitle}>{product.color}</div>
      <div className={styles.price}>{product.price} &#8381;</div>
      <Button variant="action" onClick={handler}>купить</Button>
    </div>
  );
}