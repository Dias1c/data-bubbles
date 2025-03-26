import { useEffect } from "react";
import { type IData } from "../../types";
import { useDataBubblesValue } from "../useDataBubblesValue";
import { useDrawerDataBubbles } from "../useDrawerDataBubbles";

export const useDataBubbles = (props?: { defaultValue?: IData }) => {
  const dbv = useDataBubblesValue(props);
  const ddb = useDrawerDataBubbles();

  const {
    activeData: { stateCurrent },
  } = dbv;

  useEffect(() => {
    const drawer = ddb.drawerRef.current;
    if (!drawer) return;
    drawer.data = stateCurrent?.bubbles ?? [];
  }, [stateCurrent]);

  return { ...ddb, ...dbv };
};
