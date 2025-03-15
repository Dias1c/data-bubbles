import type { IData } from "@/entities/data-bubbles";
import { PageIndexShare } from "@/features/page-index-share";
import type { ITabsElement } from "@/shared/components/tabs/Tabs";
import { useMemo, useState } from "react";

export const useAppShareUrl = ({
  data,
  tabs,
}: {
  data: IData;
  tabs: ITabsElement<string>[];
}) => {
  const [hiddenTabs, setHiddenTabs] = useState<Record<string, boolean>>(
    tabs.reduce((p, c) => {
      const res: any = p;
      res[c.value] = c.disabled;
      return res;
    }, {})
  );

  const href = useMemo(() => {
    const { origin, pathname } = window.location;
    const base = origin + pathname;
    const url = new URL(base);

    PageIndexShare.setData(url.searchParams, data);
    PageIndexShare.setHiddenTabs(
      url.searchParams,
      Object.entries(hiddenTabs)
        .filter((v) => {
          const [tab, value] = v;
          return value;
        })
        .map((v) => {
          const [tab] = v;
          return tab;
        })
    );

    console.log("params", ...url.searchParams.entries());

    return url.toString();
  }, [JSON.stringify(data), hiddenTabs]);

  return {
    hiddenTabs,
    setHiddenTabs,
    href,
  };
};
