import {
  exampleDataBubblesValue,
  getDataBubblesValueFromUrl,
  useDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { Tabs, useUrlTabs } from "@/shared/components/tabs/Tabs";
import { useHandleUrlHistoryNavigation } from "@/shared/hooks/useHandleUrlHistoryNavigation";
import { historyReplaceState } from "@/shared/lib/window/historyChangeState";
import { WidgetHeader } from "@/widgets/WidgetHeader";
import { WidgetSectionShare } from "@/widgets/WidgetSectionShare";
import { useEffect } from "react";
import { WidgetSectionSettings } from "../WidgetSectionSettings";
import { WidgetSectoinView } from "../WidgetSectionView";

type TTabValue = "view" | "share" | "settings";

const getDataBubblesDefaultValue = (): IData => {
  const data = getDataBubblesValueFromUrl({ name: "data" });
  if (data) {
    return data;
  }
  return exampleDataBubblesValue;
};

export const WidgetPageIndex = () => {
  const { drawerRef, setCanvas, activeData, setData, getData } = useDataBubbles(
    {}
  );
  const { select, selected } = useUrlTabs<TTabValue>({
    name: "activeTab",
    defaultSelected: "view",
    actionSelect: {
      onSuccess: ({ value }) => {
        drawerRef.current?.stopAnimation();
        if (value == "view") {
          drawerRef.current?.startAnimation();
          return;
        }
      },
    },
  });

  useHandleUrlHistoryNavigation(() => {
    const data = getDataBubblesValueFromUrl({ name: "data" });
    if (data) setData(data);
  });

  useEffect(() => {
    setData(getDataBubblesDefaultValue());
    drawerRef.current?.startAnimation();
  }, []);

  useEffect(() => {
    historyReplaceState({
      update: ({ url }) => {
        url.searchParams.set("data", JSON.stringify(getData()));
      },
    });
  }, [JSON.stringify(getData())]);

  return (
    <>
      <WidgetHeader
        childrenCenter={
          <Tabs<TTabValue>
            values={[
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
            ]}
            selected={selected}
            onSelect={select}
          />
        }
      />
      <WidgetSectoinView
        title={activeData.title}
        subtitle={activeData.state?.title}
        hidden={selected != "view"}
        drawerRef={drawerRef}
        setCanvas={setCanvas}
      />
      {selected == "share" && !!drawerRef.current && (
        <WidgetSectionShare drawer={drawerRef.current} />
      )}
      {selected == "settings" && !!drawerRef.current && (
        <WidgetSectionSettings setData={setData} defaultData={getData()} />
      )}
    </>
  );
};
