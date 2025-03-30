import {
  exampleDataBubblesValue,
  useDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { PageIndexShare } from "@/features/page-index-share";
import { Tabs } from "@/shared/components/tabs/Tabs";
import { useHandleUrlHistoryNavigation } from "@/shared/hooks/useHandleUrlHistoryNavigation";
import { useIsTablet } from "@/shared/hooks/useIsTablet";
import { historyReplaceState } from "@/shared/lib/window/historyChangeState";
import { WidgetHeader } from "@/widgets/WidgetHeader";
import { WidgetSectionShare } from "@/widgets/WidgetSectionShare";
import { useEffect } from "react";
import { SectoinDataBubblesView } from "../../entities/data-bubbles/ui/SectoinDataBubblesView";
import { WidgetSectionSettings } from "../WidgetSectionSettings";
import { usePageIndexTabs } from "./hooks";
import { Footer } from "./ui/Footer";

const getDataBubblesDefaultValue = (): IData => {
  const url = new URL(window.location.href);
  const data = PageIndexShare.getData(url.searchParams);
  if (data) {
    return data;
  }
  return exampleDataBubblesValue;
};

export const WidgetPageIndex = () => {
  const isTablet = useIsTablet();

  const dataBubbles = useDataBubbles();
  const { drawerRef, setData, getData } = dataBubbles;

  const { select, selected, tabs, visibleTabs } = usePageIndexTabs({
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

  useHandleUrlHistoryNavigation(({ url }) => {
    const data = PageIndexShare.getData(url.searchParams);
    if (data) setData(data);
  });

  useEffect(() => {
    setData(getDataBubblesDefaultValue());
    drawerRef.current?.startAnimation();
  }, []);

  useEffect(() => {
    historyReplaceState({
      update: ({ url }) => {
        PageIndexShare.setData(url.searchParams, getData());
      },
    });
  }, [JSON.stringify(getData())]);

  const isTabsVisible = visibleTabs.length > 1;

  return (
    <>
      <WidgetHeader
        childrenCenter={
          !isTablet &&
          isTabsVisible && (
            <Tabs values={tabs} selected={selected} onSelect={select} />
          )
        }
      />
      <SectoinDataBubblesView hidden={selected != "view"} {...dataBubbles} />
      {selected == "share" && !!drawerRef.current && (
        <WidgetSectionShare
          drawer={drawerRef.current}
          getData={getData}
          tabs={tabs.filter((v) => v.value != "view")}
        />
      )}
      {selected == "settings" && !!drawerRef.current && (
        <WidgetSectionSettings
          setData={setData}
          defaultData={getData()}
          colors={dataBubbles.colors}
        />
      )}
      {isTablet && isTabsVisible && (
        <Footer
          children={
            <Tabs
              values={tabs}
              selected={selected}
              onSelect={select}
              linePosition="top"
            />
          }
        />
      )}
    </>
  );
};
