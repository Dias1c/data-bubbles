import { useState } from "react";

type TFuncOnActionCallback<T> = (props: { value?: T }) => Promise<void> | void;

type TactionSelect<T> = {
  onStart?: TFuncOnActionCallback<T>;
  onSuccess?: TFuncOnActionCallback<T>;
  onError?: (error: unknown) => Promise<void> | void;
  onFinish?: TFuncOnActionCallback<T>;
};

export function useTabs<T>({
  defaultSelected,
  actionSelect,
}: {
  defaultSelected?: T;
  actionSelect?: TactionSelect<T>;
}) {
  const [selected, setSelected] = useState<T | undefined>(defaultSelected);

  const select = async (
    { value }: { value?: T },
    localActionSelect?: TactionSelect<T>
  ) => {
    try {
      await localActionSelect?.onStart?.({ value });
      await actionSelect?.onStart?.({ value });
      setSelected(value);
      await localActionSelect?.onSuccess?.({ value });
      await actionSelect?.onSuccess?.({ value });
    } catch (error) {
      await localActionSelect?.onError?.({ value });
      await actionSelect?.onError?.(error);
    } finally {
      await localActionSelect?.onFinish?.({ value });
      await actionSelect?.onFinish?.({ value });
    }
  };

  return { selected, select };
}
