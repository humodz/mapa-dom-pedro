import { useUniqueId } from '../../utils/hooks';

export function RadioButton({ label, checked, onChange }) {
  const id = useUniqueId('radio');

  return (
    <div>
      <input
        type='radio'
        id={id}
        checked={checked}
        onChange={onChange}
      ></input>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}