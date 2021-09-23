import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Overlay.module.css';

export default function Overlay({ children, show, onClose }) {
  const element = useRef();

  if (show && !element.current) {
    const overlay = document.createElement("div");
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    element.current = overlay;
  }

  useEffect(() => {
    if (!show && element.current) {
      element.current.remove();
      element.current = null;
      document.body.style.overflow = 'visible';
    }
  }, [show]);

  const handleOverlayClick = () => {
    onClose && onClose();
  }

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {children}
    </div>
    , element.current)
}