export const InputTextArea = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => {
  return <textarea value={value} onChange={onChange}></textarea>;
};
