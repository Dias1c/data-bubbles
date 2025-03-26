import { copyToClipboard } from "@/shared/lib/window/copyToClipboard";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";

export const ButtonCopy = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCopied(false);
  }, [value]);

  /**
   * Set Copied False if clicked anywhere
   */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      if (!(target instanceof HTMLElement)) {
        setCopied(false);
        return;
      }

      while (target) {
        if (target == btnRef.current) {
          return;
        }
        if (target.tagName == "BUTTON") {
          target = target.parentElement;
        } else {
          target = target?.closest?.("button");
        }
      }
      setCopied(false);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Button
      onClick={() => {
        copyToClipboard({ text: value, onSuccess: () => setCopied(true) });
      }}
      ref={btnRef}
    >
      {copied ? "✅ Copied" : "📋 Copy"}
    </Button>
  );
};
