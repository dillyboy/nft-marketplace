import React from 'react';
import styles from "./Button.module.scss";

const Button = ({label, onClick}) => {
  return <button onClick={onClick} className={styles.button}>{label}</button>
}

export default Button;
