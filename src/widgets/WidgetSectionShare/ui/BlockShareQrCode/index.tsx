import { Button } from "@/shared/components/buttons/Button";
import { Typography } from "@/shared/components/typography/Typography";
import { download } from "@/shared/lib/files/download";
import { useRef } from "react";
import QRCode from "react-qr-code";

import styles from "./styles.module.css";

export const BlockShareQrCode = ({ value }: { value: string }) => {
  const ref = useRef<SVGElement>(null);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <Typography>QR Code</Typography>
      <div className={styles.section_qr__block_qr}>
        <div
          className={styles.section_qr__block_qr__block}
          onClick={() => {
            const qr = ref.current;
            if (!qr) return;
            console.dir(qr);
            const svgData = new XMLSerializer().serializeToString(qr);
            const svgBlob = new Blob([svgData], {
              type: "image/svg+xml;charset=utf-8",
            });
            const url = URL.createObjectURL(svgBlob);

            download({ url, name: "data-bubbles-qr" });
          }}
        >
          <p>📥 Click to Download</p>
        </div>
        <QRCode
          ref={ref as any}
          value={value}
          style={{
            width: "100%",
            height: "100%",
          }}
          fgColor="var(--color-bg-default, #000)"
        />
      </div>
    </section>
  );
};
