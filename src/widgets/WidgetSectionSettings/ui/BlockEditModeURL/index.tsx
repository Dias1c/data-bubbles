import type { useDataBubbles } from "@/entities/data-bubbles";
import { Button } from "@/shared/components/buttons/Button";
import { InputText } from "@/shared/components/inputs/InputText";
import { Typography } from "@/shared/components/typography/Typography";
import { useCallback, useState } from "react";

export const BlockEditModeURL = ({
  dataBubbles,
  onSuccess,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
  onSuccess?: (props: { url: string }) => void;
}) => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <Typography>URL</Typography>
      <InputText
        value={url}
        onChange={(e) => {
          setError("");
          setIsSuccess(false);
          setUrl(e.currentTarget.value);
        }}
        placeholder={"/examples/data/dogs_top_speed.json or https://..."}
      />
      <div>
        <ButtonLoadTextFromUrl
          url={url}
          onStart={() => setError("")}
          onError={(e) => {
            if (e instanceof Error) {
              setError(e.message);
            }
          }}
          onSuccess={({ text }) => {
            try {
              const parsed = JSON.parse(text);
              dataBubbles.setData(parsed);
              setIsSuccess(true);
              onSuccess?.({ url });
            } catch (e) {
              if (e instanceof Error) {
                setError(e.message);
              }
            }
          }}
        />
      </div>
      {isSuccess && (
        <span
          style={{
            color: "green",
          }}
        >
          Loaded successfully
        </span>
      )}
      {!!error && (
        <span
          style={{
            color: "red",
          }}
        >
          {error}
        </span>
      )}
    </>
  );
};

const ButtonLoadTextFromUrl = ({
  url,
  disabled,
  onStart,
  onError,
  onSuccess,
  onFinish,
}: {
  url: string;
  disabled?: boolean;
  onStart?: () => void;
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (props: {
    text: string;
    contentType: string | null;
    result: Response;
  }) => Promise<void> | void;
  onFinish?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] = useState<
    AbortController | undefined
  >();

  const onClick = useCallback(async () => {
    abortController?.abort();

    const ac = new AbortController();
    setAbortController(ac);

    try {
      onStart?.();
      setLoading(true);
      const resp = await fetch(url, {
        signal: ac?.signal,
      });
      const contentType = resp.headers.get("content-type");
      const text = await resp.text();
      onSuccess?.({ text, contentType, result: resp });
    } catch (error) {
      if (ac.signal.aborted) return;
      onError?.(error);
    } finally {
      setLoading(false);
      onFinish?.();
    }
  }, [url]);

  return (
    <Button onClick={onClick} disabled={disabled} loading={loading}>
      Load and Apply
    </Button>
  );
};
