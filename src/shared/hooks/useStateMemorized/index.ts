import { isWindowInIframe } from "@/shared/lib/window/isWindowInIframe";
import { hls } from "@diaskappassov/hungry-local-storage";
import { useState } from "react";

function getOrSetDefaultValue<T>({
  name,
  defaultValue,
  expiration,
  disableAutoExtension,
}: {
  name: string;
  defaultValue: T;
  expiration?: Parameters<typeof hls.set>[2];
  disableAutoExtension?: boolean;
}): T {
  if (isWindowInIframe()) {
    return defaultValue;
  }

  const result = hls.get(name);
  if (result === null) {
    hls.set(name, defaultValue, expiration);
    return defaultValue;
  }

  if (!disableAutoExtension) {
    hls.set(name, result, expiration);
  }

  return result;
}

export function useStateMemorized<T>({
  name,
  defaultValue,
  expiration,
  disableAutoExtension,
}: Parameters<typeof getOrSetDefaultValue<T>>[0]): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(
    getOrSetDefaultValue({
      name,
      defaultValue,
      expiration,
      disableAutoExtension,
    })
  );

  const setStateProcessed = (value: T) => {
    if (!isWindowInIframe()) {
      hls.set(name, value, expiration);
    }
    setState(value);
  };

  return [state, setStateProcessed];
}
