import { CONFIG } from "@/shared/config";
import { useMatchMedia } from "../useMatchMedia";

export const useIsTablet = () => {
  const matchMediaMobile = useMatchMedia(
    `(max-width: ${CONFIG.breakpoints.tablet}px)`
  );

  return matchMediaMobile.matches;
};
