export const InputNumber = ({
  disabled,
  min,
  max,
  value,
  onChange,
}: {
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      disabled={disabled}
      min={min}
      max={max}
    />
  );
};
