import { useId } from 'react';

export function RadioButton({ label, checked, onChange }) {
  const id = useId();

  return (
    <div>
      <input
        type='radio'
        id={`radio-${id}`}
        checked={checked}
        onChange={onChange}
      ></input>
      <label htmlFor={`radio-${id}`}>{label}</label>
    </div>
  );
}