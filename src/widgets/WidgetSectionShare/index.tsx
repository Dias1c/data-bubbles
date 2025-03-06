import type { DrawerDataBubbles } from "@/entities/drawer";
import { useEffect, useState } from "react";

// TODO
// const isMobile =

const BoxDrawerImageDownload = ({
  drawer,
  mimeType,
}: {
  drawer: DrawerDataBubbles;
  mimeType: string;
}) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const url = drawer.canvas.toDataURL("image/png");
    setUrl(url);

    return () => {
      setUrl(undefined);
    };
  }, [mimeType]);

  return (
    <div
      style={{
        display: "block",
        borderRadius: "4px",
        border: "1px solid var(--color-divider)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={url}
        alt="Data Bubbles"
        style={{
          width: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",

          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <p>Click to download</p>
      </div>
    </div>
  );
};

export const WidgetSectionShare = ({
  drawer,
}: {
  drawer: DrawerDataBubbles;
}) => {
  return (
    <>
      TODO: Buttons
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <BoxDrawerImageDownload drawer={drawer} mimeType={"image/png"} />
      </div>
    </>
  );
};
