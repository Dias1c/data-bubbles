export const InputCheckbox = (
  props: Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  >
) => {
  return <input type="checkbox" {...props} />;
};
