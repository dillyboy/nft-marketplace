import React, {useState} from 'react';
import styles from "./Input.module.scss";

const Input = ({label, type, suffix, error, onChange}) => {
  if (!type) {
    type = 'text';
  }
  const [value, setValue] = useState('');
  const outputValue = (val) => {
    if (error) {
      onChange(val);
    }
  }

  return <div className={styles.inputContainer}>
    <label>{label}</label>
    <input
      className={error ? styles.error : ''}
      type={type}
      value={value}
      onChange={ev => {
        setValue(ev.target.value);
        outputValue(ev.target.value);
      }}
      onBlur={ev => onChange(ev.target.value)} />
    <span className={styles.suffix}>{suffix}</span>
  </div>
}

export default Input;
