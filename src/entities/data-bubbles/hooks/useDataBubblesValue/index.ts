import { useEffect, useMemo, useState } from "react";
import type { IData, IDataState } from "../../types";

export const useDataBubblesValue = ({
  defaultValue,
}: {
  defaultValue: IData;
}) => {
  const [data, setData] = useState<IData>(defaultValue);
  const [state, setState] = useState<IDataState>();

  const memo = useMemo(() => {
    let data = defaultValue;
    return {
      set: (v: IData) => {
        data = v;
        setData(v);
        setState(data?.states?.[0] ?? {});
      },
      get: () => data,
    };
  }, []);

  useEffect(() => {
    memo.set(defaultValue);
  }, []);

  const activeData = useMemo(() => {
    return {
      title: data?.title,
      state: state,
    };
  }, [data, state]);

  return { activeData, setData: memo.set, getData: memo.get };
};
