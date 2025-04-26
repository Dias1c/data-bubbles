import { hls } from "@diaskappassov/hungry-local-storage";
import { isWindowInIframe } from "../window/isWindowInIframe";

export const setLocalStorageValueSafe = <T>({
  name,
  value,
  expiration,
}: {
  name: string;
  value: T;
  expiration?: Parameters<typeof hls.set>[2];
}) => {
  if (!isWindowInIframe()) {
    hls.set(name, value, expiration);
  }
};
