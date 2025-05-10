export const InputText = ({
  disabled,
  value,
  onChange,
  placeholder,
  style,
}: {
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      style={style}
    />
  );
};
