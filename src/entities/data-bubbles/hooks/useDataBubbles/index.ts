import { useEffect } from "react";
import { type IData } from "../../types";
import { useDataBubblesValue } from "../useDataBubblesValue";
import { useDrawerDataBubbles } from "../useDrawerDataBubbles";

export const useDataBubbles = ({ defaultValue }: { defaultValue: IData }) => {
  const { data, state, activeData } = useDataBubblesValue({ defaultValue });
  const ddb = useDrawerDataBubbles();

  useEffect(() => {
    const drawer = ddb.drawerRef.current;
    if (!drawer) return;
    drawer.data = state?.bubbles ?? [];
  }, [state]);

  return { ...ddb, data, activeData };
};
