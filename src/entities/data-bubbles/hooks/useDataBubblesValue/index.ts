import { useMemo, useReducer } from "react";
import type { IData } from "../../types";

type TAction = {
  type: "set";
  value: IData;
};

const reducer = (state: IData, action: TAction): IData => {
  if (action.type === "set") {
    return action.value;
  }

  return state;
};

export const useDataBubblesValue = (props?: { defaultValue?: IData }) => {
  const { defaultValue } = props ?? {};

  const [data, dispatch] = useReducer(reducer, defaultValue ?? {});

  const memo = useMemo(() => {
    let data = defaultValue ?? {};
    return {
      set: (v: IData) => {
        data = v;
        dispatch({ type: "set", value: v });
      },
      get: () => data,
    };
  }, []);

  const activeData = useMemo(() => {
    const stateIndex = data.state_index ?? 0;
    const statePrev = data.states?.[stateIndex - 1] ?? {};
    const stateCurrent = data.states?.[stateIndex] ?? {};
    const stateLength = data.states?.length ?? 0;

    return {
      title: data?.title,
      statePrev,
      stateCurrent,
      stateIndex,
      stateLength,
    };
  }, [data]);

  return { activeData, setData: memo.set, getData: memo.get };
};
