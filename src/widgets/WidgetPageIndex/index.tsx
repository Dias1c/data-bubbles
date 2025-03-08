import { useDrawerDataBubbles } from "@/entities/drawer";
import { Tabs, useTabs } from "@/shared/components/tabs/Tabs";
import { WidgetHeader } from "@/widgets/WidgetHeader";
import { WidgetSectionShare } from "@/widgets/WidgetSectionShare";
import { useEffect } from "react";
import { WidgetSectionSettings } from "../WidgetSectionSettings";
import { WidgetSectoinView } from "../WidgetSectionView";

type TTabValue = "view" | "share" | "settings";

export const WidgetPageIndex = () => {
  const { drawerRef, setCanvas } = useDrawerDataBubbles();
  const { select, selected } = useTabs<TTabValue>({
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

  useEffect(() => {
    drawerRef.current?.startAnimation();
  }, []);

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
        hidden={selected != "view"}
        drawerRef={drawerRef}
        setCanvas={setCanvas}
      />
      {selected == "share" && !!drawerRef.current && (
        <WidgetSectionShare drawer={drawerRef.current} />
      )}
      {selected == "settings" && !!drawerRef.current && (
        <WidgetSectionSettings drawer={drawerRef.current} />
      )}
    </>
  );
};
