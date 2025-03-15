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

  const tabs: ITabsElement<TTabValue>[] = useMemo(() => {
    return [
      {
        label: "View",
        value: "view",
      },
      {
        label: "Share",
        value: "share",
      },
      {
        label: "Settings",
        value: "settings",
      },
    ];
  }, []);

  return { select, selected, tabs };
};
