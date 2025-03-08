import type { ReactNode } from "react";

type TVariant = "h3";

export const Typography = ({
  children,
  variant,
  disabled,
}: {
  children?: ReactNode;
  variant?: TVariant;
  disabled?: boolean;
}) => {
  if (variant == "h3") return <Heading3>{children}</Heading3>;
  return <p className={disabled ? "disabled" : undefined}>{children}</p>;
};

const Heading3 = ({
  children,
  disabled,
}: {
  children?: ReactNode;
  disabled?: boolean;
}) => {
  return <h3 className={disabled ? "disabled" : undefined}>{children}</h3>;
};
