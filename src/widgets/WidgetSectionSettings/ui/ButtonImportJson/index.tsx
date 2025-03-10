import { Button } from "@/shared/components/buttons/Button";
import { useRef, useState, type ReactNode } from "react";

export const ButtonImportJson = ({
  children,
  disabled,
  onSuccess,
}: {
  children?: ReactNode;
  disabled?: boolean;
  onSuccess?: (props: { json: string }) => Promise<void> | void;
}) => {
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    const input = inputRef.current;
    if (!input) return;
    setLoading(true);
    input?.click();
  };

  return (
    <>
      <Button
        onClick={onClick}
        loading={loading}
        disabled={disabled}
        variant="outlined"
      >
        {children}
      </Button>
      <input
        type="file"
        ref={inputRef}
        accept="application/json"
        style={{
          zIndex: -1,
          position: "fixed",
          top: 0,
          left: 0,
        }}
        onError={() => setLoading(false)}
        onChange={async (e) => {
          const files = e.target.files;
          if (!files?.length) {
            setLoading(false);
            return;
          }

          const file = files[0];
          const text = await file.text();
          onSuccess?.({ json: text });
          setLoading(false);
        }}
      />
    </>
  );
};
