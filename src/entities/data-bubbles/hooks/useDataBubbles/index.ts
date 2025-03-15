import { useEffect } from "react";
import { type IData } from "../../types";
import { useDataBubblesValue } from "../useDataBubblesValue";
import { useDrawerDataBubbles } from "../useDrawerDataBubbles";

export const useDataBubbles = (props?: { defaultValue?: IData }) => {
  const dbv = useDataBubblesValue(props);
  const ddb = useDrawerDataBubbles();

  const {
    activeData: { state },
  } = dbv;
  useEffect(() => {
    const drawer = ddb.drawerRef.current;
    if (!drawer) return;
    drawer.data = state?.bubbles ?? [];
  }, [state]);

  return { ...ddb, ...dbv };
};
