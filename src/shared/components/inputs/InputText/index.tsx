export const InputText = ({
  disabled,
  value,
  onChange,
}: {
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input type="text" value={value} onChange={onChange} disabled={disabled} />
  );
};
