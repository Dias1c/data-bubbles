import { useDataBubbles } from "@/entities/data-bubbles";
import { CUserStore } from "@/features/user-store";
import { useMemo } from "react";

export const usePageIndexDataBubbles = () => {
  const dataBubblesProps = useMemo((): Parameters<
    typeof useDataBubbles
  >["0"] => {
    const drawerColors = CUserStore.drawerColors.get();

    return {
      defaultColors: drawerColors || undefined,
    };
  }, []);

  return useDataBubbles(dataBubblesProps);
};
