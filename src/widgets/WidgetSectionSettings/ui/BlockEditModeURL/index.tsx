import type { useDataBubbles } from "@/entities/data-bubbles";
import { Button } from "@/shared/components/buttons/Button";
import { DividerHorizontal } from "@/shared/components/dividers/DividerHorizontal";
import { InputText } from "@/shared/components/inputs/InputText";
import { Typography } from "@/shared/components/typography/Typography";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import { useState } from "react";

export const BlockEditModeURL = ({
  dataBubbles,
  onSuccess,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
  onSuccess?: (props: { url: string }) => void;
}) => {
  const [urlsHistory, setUrlsHistory] = useStateMemorized<string[]>({
    defaultValue: [],
    name: "tabs:settings:data_settings:url:urls_history",
    expiration: {
      months: 3,
    },
  });
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { run, loading } = useActionLoadTextFromUrl({
    onStart: () => setError(""),
    onError: (e) => {
      if (e instanceof Error) {
        setError(e.message);
      }
    },
    onSuccess: ({ text, url }) => {
      try {
        const parsed = JSON.parse(text);
        dataBubbles.setData(parsed);
        setIsSuccess(true);
        onSuccess?.({ url });
        setUrlsHistory([url, ...urlsHistory.filter((v) => v != url)]);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    },
  });

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
        <Button disabled={!url || loading} onClick={() => run({ url })}>
          📥 Load and Apply
        </Button>
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
      {!!urlsHistory?.length && (
        <FragmentUrlLists
          urls={urlsHistory}
          title="History"
          onClickLoad={({ url }) => {
            setUrl(url);
            run({ url });
          }}
          clear={() => setUrlsHistory([])}
          disabled={loading}
        />
      )}
      <FragmentUrlLists
        urls={["/examples/data/dogs_top_speed.json"]}
        title="Recommendations"
        onClickLoad={({ url }) => {
          setUrl(url);
          run({ url });
        }}
        disabled={loading}
      />
    </>
  );
};

const FragmentUrlLists = ({
  urls,
  clear,
  disabled,
  title,
  onClickLoad,
}: {
  urls: string[];
  clear?: () => void;
  title: string;
  disabled?: boolean;
  onClickLoad: (props: { url: string }) => void;
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>{title}</Typography>
        {!!clear && <Button onClick={clear}>🧹 Clear</Button>}
      </div>
      {urls.map((url) => {
        return (
          <div
            style={{
              marginTop: "4px",
            }}
          >
            <DividerHorizontal />
            <div
              key={url}
              style={{
                marginTop: "4px",
                display: "flex",
                gap: "4px",
                justifyContent: "space-between",
              }}
            >
              <p style={{ textWrap: "wrap", lineBreak: "anywhere" }}>{url}</p>

              <Button disabled={disabled} onClick={() => onClickLoad({ url })}>
                📥 load
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

const useActionLoadTextFromUrl = ({
  onStart,
  onError,
  onSuccess,
  onFinish,
}: {
  onStart?: () => void;
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (props: {
    url: string;
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

  const run = async ({ url }: { url: string }) => {
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
      onSuccess?.({ text, contentType, result: resp, url });
    } catch (error) {
      if (ac.signal.aborted) return;
      onError?.(error);
    } finally {
      setLoading(false);
      onFinish?.();
    }
  };

  return { loading, run };
};
