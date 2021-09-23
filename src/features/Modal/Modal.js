import Overlay from '../Overlay/Overlay';
import styles from './Modal.module.css';

export default function Modal({ title, children, ...props }) {
  return (
    <Overlay {...props}>
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.closeButton} onClick={props.onClose}>+</div>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}