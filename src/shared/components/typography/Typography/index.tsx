import type { ReactNode } from "react";

type TVariant = "h3";

export const Typography = ({
  children,
  variant,
}: {
  children?: ReactNode;
  variant?: TVariant;
}) => {
  if (variant == "h3") return <Heading3>{children}</Heading3>;
  return <p>{children}</p>;
};

const Heading3 = ({ children }: { children?: ReactNode }) => {
  return <h3>{children}</h3>;
};
