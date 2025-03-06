import { useState } from "react";

type TFuncOnActionCallback = <T>(props: { value?: T }) => Promise<void> | void;

export function useTabs<T>({
  defaultSelected,
  actionSelect,
}: {
  defaultSelected?: T;
  actionSelect?: {
    onStart?: TFuncOnActionCallback;
    onSuccess?: TFuncOnActionCallback;
    onError?: (error: unknown) => Promise<void> | void;
    onFinish?: TFuncOnActionCallback;
  };
}) {
  const [selected, setSelected] = useState<T | undefined>(defaultSelected);

  const select = async ({ value }: { value?: T }) => {
    try {
      await actionSelect?.onStart?.({ value });
      setSelected(value);
      await actionSelect?.onSuccess?.({ value });
    } catch (error) {
      await actionSelect?.onError?.(error);
    } finally {
      await actionSelect?.onFinish?.({ value });
    }
  };

  return { selected, select };
}
