import type { IData } from "@/entities/data-bubbles";
import { Button } from "@/shared/components/buttons/Button";
import { useState, type ReactNode } from "react";

export const ButtonExportJson = ({
  data,
  filename,
  children,
  disabled,
}: {
  data: IData;
  filename: string;
  children?: ReactNode;
  disabled?: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const jsonStr = JSON.stringify(data);
    const base64 =
      "data:application/json;charset=utf-8," + encodeURIComponent(jsonStr);

    const a = document.createElement("a");
    a.href = base64;
    a.download = filename;

    document.body.append(a);
    a.click();
    a.remove();
    setLoading(false);
  };

  return (
    <Button
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      variant="outlined"
    >
      {children}
    </Button>
  );
};
