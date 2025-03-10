import { useEffect, useMemo, useState } from "react";
import type { IData, IDataState } from "../../types";

export const useDataBubblesValue = ({
  defaultValue,
}: {
  defaultValue: IData;
}) => {
  const [data, setData] = useState<IData>(defaultValue);
  const [state, setState] = useState<IDataState>();

  useEffect(() => {
    setData(defaultValue);
    setState(defaultValue?.states?.[0] ?? {});
  }, [defaultValue]);

  const activeData = useMemo(() => {
    return {
      title: data?.title,
      state: state,
    };
  }, [data, state]);

  return { data, state, activeData, setData, setState };
};
