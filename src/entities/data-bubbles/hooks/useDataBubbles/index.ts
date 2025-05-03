import { useCallback, useEffect } from "react";
import type { DrawerDataBubbles, IDrawerDataBubblesColors } from "../../lib";
import {
  type IData,
  type IDataState,
  type IDataStateBubble,
} from "../../types";
import { useDataBubblesValue } from "../useDataBubblesValue";
import { useDrawerDataBubbles } from "../useDrawerDataBubbles";

export const useDataBubbles = (props?: {
  defaultValue?: IData;
  defaultColors?: IDrawerDataBubblesColors;
}) => {
  const dbv = useDataBubblesValue(props);
  const ddb = useDrawerDataBubbles(props);

  const { activeData } = dbv;

  const setActiveDataToDrawer = useCallback(
    (drawer: DrawerDataBubbles) => {
      const { stateCurrent, statePrev } = activeData;
      const bubbleDefinitions = dbv.getData().definitions ?? {};

      drawer.setData(
        convertStateBubbleToArray(stateCurrent?.bubbles, bubbleDefinitions),
        convertStateBubbleToArray(statePrev?.bubbles, bubbleDefinitions)
      );
    },
    [activeData]
  );

  useEffect(() => {
    const drawer = ddb.drawerRef.current;
    if (!drawer) return;
    setActiveDataToDrawer(drawer);
  }, [activeData]);

  return { ...ddb, ...dbv, setActiveDataToDrawer };
};

const convertStateBubbleToArray = (
  bubbles?: IDataState["bubbles"],
  definitions?: IData["definitions"]
): IDataStateBubble[] => {
  if (!bubbles) return [];

  const result: IDataStateBubble[] = [];
  if (Array.isArray(bubbles)) {
    bubbles.forEach((v) => {
      result.push({ ...definitions?.[v.name], ...v });
    });
  } else {
    const bubbleNames = Object.keys(bubbles);
    bubbleNames.forEach((name) => {
      const v = bubbles[name];
      if (typeof v == "number") {
        result.push({ name, ...definitions?.[name], value: v });
        return;
      }
      result.push({ name, ...definitions?.[name], ...v });
    });
  }

  return result;
};
