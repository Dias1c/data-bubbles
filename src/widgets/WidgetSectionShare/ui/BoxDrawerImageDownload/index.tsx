import type { DrawerDataBubbles } from "@/entities/drawer";
import { download } from "@/shared/lib/files/download";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

// TODO
// const isMobile =

export const BoxDrawerImageDownload = ({
  drawer,
  name,
  mimeType,
}: {
  drawer: DrawerDataBubbles;
  name?: string;
  mimeType: string;
}) => {
  const [url, setUrl] = useState<string>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const url = drawer.canvas.toDataURL(mimeType);
    setUrl(url);

    return () => {
      setUrl(undefined);
      setLoaded(false);
    };
  }, [mimeType]);

  return (
    <div
      className={styles.block_image}
      style={
        !loaded
          ? {
              aspectRatio: `${drawer.canvas.width} / ${drawer.canvas.height}`,
            }
          : undefined
      }
      title="Download Image"
      onClick={() => {
        if (!url) return;
        download({ url, name: name ?? "data-bubbles.png" });
      }}
    >
      <img
        src={url}
        alt="Data Bubbles"
        className={styles.block_image__img}
        onLoad={() => setLoaded(true)}
        style={
          !loaded
            ? {
                display: "none",
              }
            : undefined
        }
      />
      <div className={styles.block_image__top_layer}>
        <p className={styles.block_image__top_layer__text}>Click to download</p>
      </div>
    </div>
  );
};
