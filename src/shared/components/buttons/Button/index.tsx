import type React from "react";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

export type TButtonVariant = "outlined" | "text";

const variantClassNames: Record<TButtonVariant, string> = {
  outlined: `${styles.button} ${styles.outlined}`,
  text: `${styles.button} ${styles.text}`,
};

export const Button = ({
  variant = "outlined",
  disabled,
  children,
  onClick,
}: {
  variant?: TButtonVariant;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={variantClassNames[variant]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
