import { useEffect } from "react";

export const useHandleUrlHistoryNavigation = (
  handler: (props: { event: PopStateEvent; url: URL }) => Promise<void> | void
) => {
  useEffect(() => {
    const handle = async (event: PopStateEvent) => {
      await handler({ event, url: new URL(window.location.href) });
    };

    window.addEventListener("popstate", handle);
    return () => {
      window.removeEventListener("popstate", handle);
    };
  }, []);
};
