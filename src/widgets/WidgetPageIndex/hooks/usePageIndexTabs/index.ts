import { PageIndexShare } from "@/features/page-index-share";
import { useUrlTabs, type ITabsElement } from "@/shared/components/tabs/Tabs";
import { useMemo } from "react";

type TTabValue = "view" | "share" | "settings";

export const usePageIndexTabs = ({
  actionSelect,
}: Pick<Parameters<typeof useUrlTabs<TTabValue>>[0], "actionSelect">) => {
  const { select, selected } = useUrlTabs<TTabValue>({
    name: "activeTab",
    defaultSelected: "view",
    actionSelect,
  });

  const tabs = useMemo((): ITabsElement<TTabValue>[] => {
    const url = new URL(window.location.href);
    const hiddenTabsSet = new Set();
    const hiddenTabsArr = PageIndexShare.getHiddenTabs(url.searchParams);
    hiddenTabsArr?.forEach((tab) => {
      hiddenTabsSet.add(tab);
    });

    return [
      {
        label: "View",
        value: "view",
      },
      {
        label: "Share",
        value: "share",
        hidden: hiddenTabsSet.has("share"),
      },
      {
        label: "Settings",
        value: "settings",
        hidden: hiddenTabsSet.has("settings"),
      },
    ];
  }, []);

  return { select, selected, tabs };
};
