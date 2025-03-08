import type React from "react";
import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { LoadingCircleSvg } from "../../loading/LoadingCircleSvg";

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
  loading,
}: {
  variant?: TButtonVariant;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}) => {
  return (
    <button
      className={variantClassNames[variant]}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <LoadingCircleSvg size={14} />}
      {children}
    </button>
  );
};
