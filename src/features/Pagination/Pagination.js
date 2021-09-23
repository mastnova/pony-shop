import Button from '../../components/Button/Button';
import styles from './Pagination.module.css';

export default function Pagination({ count, currentPage, itemsPerPage, onChange }) {
  const pageCount = Math.ceil(count / itemsPerPage);

  const handlePreviousButton = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  }

  const handleNextButton = () => {
    if (currentPage < pageCount) {
      onChange(currentPage + 1);
    }
  }

  if (pageCount < 2) return null;

  return (
    <div className={styles.pagination}>
      <Button onClick={handlePreviousButton} disabled={currentPage === 1}>{'<'}</Button>
      {
        Array(pageCount).fill().map((el, i) => {
          const page = i + 1;
          return (
            <span
              key={page}
              className={page === currentPage ? styles.active : ''}
              onClick={() => onChange(page)}
            >
              {page}
            </span>
          );
        })
      }
      <Button onClick={handleNextButton} disabled={currentPage === pageCount}>{'>'}</Button>
    </div>
  );
}