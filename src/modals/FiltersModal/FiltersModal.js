import { useState, useContext } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../features/Modal/Modal';
import { AppDispatch } from "../../App";
import { colors, kinds } from '../../utils';
import styles from './FiltersModal.module.css';

export default function FiltersModal({ show, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useContext(AppDispatch);

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFilters(filters => ({ ...filters, [target.name]: value }))
  }

  const handleClose = () => {
    dispatch({ type: 'show_filters', payload: false });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'change_filters', payload: filters });
    dispatch({ type: 'change_page', payload: 1 });
    handleClose();
  }

  return (
    <Modal title="Фильтры" show={show} onClose={handleClose}>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>Цвет</label>
          <select name="color" value={filters.color} onChange={handleChange}>
            <option value="">Все цвета</option>
            {
              colors.map(color => <option key={color} value={color}>{color}</option>)
            }
          </select>
        </div>
        <div className={styles.row}>
          <label>Вид</label>
          <select name="kind" value={filters.kind} onChange={handleChange}>
            <option value="">Все виды</option>
            {
              kinds.map(kind => <option key={kind} value={kind}>{kind}</option>)
            }
          </select>
        </div>
        <div className={styles.row}>
          <label>Минимальная цена</label>
          <input
            name="minPrice"
            type="range"
            min="0"
            max="1000"
            step="1"
            value={filters.minPrice}
            onChange={handleChange}
          />
          {filters.minPrice}
        </div>
        <div className={styles.row}>
          <label>Максимальная цена</label>
          <input
            name="maxPrice"
            type="range"
            min="0"
            max="1000"
            step="1"
            value={filters.maxPrice}
            onChange={handleChange}
          />
          {filters.maxPrice}
        </div>
        <div className={styles.row}>
          <label>
            <input
              name="onlyNew"
              type="checkbox"
              checked={filters.onlyNew}
              onChange={handleChange}
            />
            только новинки
          </label>
        </div>
        <div className={styles.button}>
          <Button variant="action" type="submit">Найти</Button>
        </div>
      </form>
    </Modal>
  );
}