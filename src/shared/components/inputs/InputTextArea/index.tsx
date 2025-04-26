export const InputTextArea = ({
  value,
  onChange,
  disabled,
  style,
}: {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={style}
    ></textarea>
  );
};
