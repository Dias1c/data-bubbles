import { CanvasDataBubbles, useDrawerDataBubbles } from "@/entities/drawer";
import { Subheader } from "@/shared/components/headers/Subheader";
import { Tabs, useTabs } from "@/shared/components/tabs/Tabs";
import { WidgetHeader } from "@/widgets/WidgetHeader";
import { WidgetSectionShare } from "@/widgets/WidgetSectionShare";
import { useEffect } from "react";

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
      <Subheader
        title="Sousou no Frieren"
        subtitle="Принимать вызовы — значит инвестировать в себя"
      />
      <section
        style={{
          // display: selected == "view" ? "flex" : "none",
          opacity: selected == "view" ? "1" : "0.5",
        }}
      >
        <CanvasDataBubbles drawerRef={drawerRef} setCanvas={setCanvas} />
      </section>
      {selected == "share" && !!drawerRef.current && (
        <WidgetSectionShare drawer={drawerRef.current} />
      )}
      {selected == "settings" && !!drawerRef.current && <>Settings</>}
    </>
  );
};
