import { PageIndexShare } from "@/features/page-index-share";
import { useUrlTabs, type ITabsElement } from "@/shared/components/tabs/Tabs";
import { useMemo } from "react";

type TTabValue = "view" | "share" | "settings";

const getHiddenTabsSet = () => {
  const url = new URL(window.location.href);
  const hiddenTabsSet = new Set<TTabValue>();
  const hiddenTabsArr = PageIndexShare.getHiddenTabs(url.searchParams);
  hiddenTabsArr?.forEach((tab) => {
    hiddenTabsSet.add(tab as TTabValue);
  });

  return hiddenTabsSet;
};

export const usePageIndexTabs = ({
  actionSelect,
}: Pick<Parameters<typeof useUrlTabs<TTabValue>>[0], "actionSelect">) => {
  const { select, selected } = useUrlTabs<TTabValue>({
    name: "activeTab",
    defaultSelected: "view",
    actionSelect,
    canBeSelectedOnInit: ({ value }) => {
      const hiddenTabsSet = getHiddenTabsSet();
      return !hiddenTabsSet.has(value);
    },
  });

  const tabs = useMemo((): ITabsElement<TTabValue>[] => {
    const hiddenTabsSet = getHiddenTabsSet();

    return [
      {
        label: "📺 View",
        value: "view",
      },
      {
        label: "🚀 Share",
        value: "share",
        hidden: hiddenTabsSet.has("share"),
      },
      {
        label: "⚙️ Settings",
        value: "settings",
        hidden: hiddenTabsSet.has("settings"),
      },
    ];
  }, []);

  const visibleTabs = useMemo(() => {
    return tabs.filter((v) => !v.hidden);
  }, [tabs]);

  return { select, selected, tabs, visibleTabs };
};
