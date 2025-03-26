import type { DrawerDataBubbles } from "@/entities/data-bubbles";
import { download } from "@/shared/lib/files/download";
import { getFileExtensionByMimeType } from "@/shared/lib/files/getFileExtensionByMimeType";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

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
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const url = drawer.canvas.toDataURL(mimeType);
    setUrl(url);

    return () => {
      setUrl(undefined);
      setLoaded(false);
      setError(undefined);
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
        if (!url || !loaded) return;
        download({
          url,
          name: name ?? `data-bubbles`,
        });
      }}
    >
      <img
        src={url}
        alt="Data Bubbles"
        className={styles.block_image__img}
        onLoad={() => setLoaded(true)}
        onError={() => setError("Something went wrong")}
        style={
          !loaded
            ? {
                display: "none",
              }
            : undefined
        }
      />
      <div className={styles.block_image__top_layer}>
        <p className={styles.block_image__top_layer__text}>
          {!!error && error}
          {loaded && !error && "📥 Click to Download"}
        </p>
      </div>
    </div>
  );
};
