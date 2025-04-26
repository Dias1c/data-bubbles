import { hls } from "@diaskappassov/hungry-local-storage";
import { isWindowInIframe } from "../window/isWindowInIframe";

export function getLocalStorageValueSafe<T>({
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

  let result = hls.get(name);
  if (result === null) {
    hls.set(name, defaultValue, expiration);
    return defaultValue;
  }

  if (typeof result != typeof defaultValue) {
    result = defaultValue;
  } else if (
    !Array.isArray(result) &&
    !Array.isArray(defaultValue) &&
    typeof result == "object" &&
    typeof defaultValue == "object"
  ) {
    result = { ...defaultValue, ...result };
  }

  if (!disableAutoExtension) {
    hls.set(name, result, expiration);
  }

  return result;
}
