import {
  exampleDataBubblesValue,
  useDataBubbles,
  type IData,
} from "@/entities/data-bubbles";
import { PageIndexShare } from "@/features/page-index-share";
import { Tabs } from "@/shared/components/tabs/Tabs";
import { useHandleUrlHistoryNavigation } from "@/shared/hooks/useHandleUrlHistoryNavigation";
import { historyReplaceState } from "@/shared/lib/window/historyChangeState";
import { WidgetHeader } from "@/widgets/WidgetHeader";
import { WidgetSectionShare } from "@/widgets/WidgetSectionShare";
import { useEffect } from "react";
import { WidgetSectionSettings } from "../WidgetSectionSettings";
import { WidgetSectoinView } from "../WidgetSectionView";
import { usePageIndexTabs } from "./hooks";

const getDataBubblesDefaultValue = (): IData => {
  const url = new URL(window.location.href);
  const data = PageIndexShare.getData(url.searchParams);
  if (data) {
    return data;
  }
  return exampleDataBubblesValue;
};

export const WidgetPageIndex = () => {
  const { drawerRef, setCanvas, activeData, setData, getData } =
    useDataBubbles();

  const { select, selected, tabs } = usePageIndexTabs({
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

  return (
    <>
      <WidgetHeader
        childrenCenter={
          <Tabs values={tabs} selected={selected} onSelect={select} />
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
        <WidgetSectionShare
          drawer={drawerRef.current}
          getData={getData}
          tabs={tabs.filter((v) => v.value != "view")}
        />
      )}
      {selected == "settings" && !!drawerRef.current && (
        <WidgetSectionSettings setData={setData} defaultData={getData()} />
      )}
    </>
  );
};
