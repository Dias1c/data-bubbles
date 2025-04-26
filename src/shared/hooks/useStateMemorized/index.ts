import { getLocalStorageValueSafe } from "@/shared/lib/localStorage/getLocalStorageValueSafe";
import { setLocalStorageValueSafe } from "@/shared/lib/localStorage/setLocalStorageValueSafe";
import { useState } from "react";

export function useStateMemorized<T>({
  name,
  defaultValue,
  expiration,
  disableAutoExtension,
}: Parameters<typeof getLocalStorageValueSafe<T>>[0]): [
  T,
  (newState: T) => void
] {
  const [state, setState] = useState<T>(
    getLocalStorageValueSafe({
      name,
      defaultValue,
      expiration,
      disableAutoExtension,
    })
  );

  const setStateProcessed = (value: T) => {
    setLocalStorageValueSafe({
      name,
      value,
      expiration,
    });
    setState(value);
  };

  return [state, setStateProcessed];
}
