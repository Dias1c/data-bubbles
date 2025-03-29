import { useEffect } from "react";
import { type IData } from "../../types";
import { useDataBubblesValue } from "../useDataBubblesValue";
import { useDrawerDataBubbles } from "../useDrawerDataBubbles";

export const useDataBubbles = (props?: {
  defaultValue?: IData;
  defaultColorBackground?: string;
  defaultColorText?: string;
}) => {
  const dbv = useDataBubblesValue(props);
  const ddb = useDrawerDataBubbles(props);

  const { activeData } = dbv;

  useEffect(() => {
    const drawer = ddb.drawerRef.current;
    if (!drawer) return;
    const { stateCurrent, statePrev } = activeData;
    drawer.setData(stateCurrent?.bubbles ?? [], statePrev.bubbles ?? []);
  }, [activeData]);

  return { ...ddb, ...dbv };
};
