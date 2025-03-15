import { Button } from "@/shared/components/buttons/Button";
import { ButtonCopy } from "@/shared/components/buttons/ButtonCopy";
import { Typography } from "@/shared/components/typography/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { DividerVertical } from "@/shared/components/dividers/DividerVertical";

const sizes = {
  width: 500,
  height: 500,
};

const useControllerWindowOpen = ({
  onClose,
  onOpen,
}: {
  onClose?: () => void;
  onOpen?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const memo = useMemo(() => {
    let win: Window | null = null;

    const open: typeof window.open = (...props) => {
      win?.close();
      win = window.open(...props);

      if (win && !win.closed) {
        setIsOpen(true);
        onOpen?.();
      }

      return win;
    };

    return {
      getWindow: () => win,
      open,
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let interval: number | undefined;

    interval = setInterval(() => {
      const win = memo.getWindow();
      if (!!win && !win.closed) {
        return;
      }

      setIsOpen(false);
      onClose?.();
    }, 1_000);

    return () => clearInterval(interval);
  }, [isOpen]);

  return { ...memo, isOpen };
};

const getWindowHtmlText = (iframeHtmlText: string) => {
  return `<style>body{overscroll-behavior:none;}iframe{border:none;width:100%;height:100%;}}</style>${iframeHtmlText}`;
};

const ButtonsOpenInWindow = ({
  iframeHtmlText,
}: {
  iframeHtmlText: string;
}) => {
  const cWindow = useControllerWindowOpen({});

  useEffect(() => {
    const oldWin = cWindow.getWindow();
    if (!oldWin || oldWin.closed) {
      return;
    }

    const htmlTxext = getWindowHtmlText(iframeHtmlText);
    oldWin.document.body.innerHTML = htmlTxext;
  }, [iframeHtmlText]);

  useEffect(() => {
    return () => {
      const oldWin = cWindow.getWindow();
      if (!oldWin || oldWin.closed) {
        return;
      }

      oldWin.close();
    };
  }, []);

  const handleOpen = useCallback(
    (reopen?: boolean) => {
      const oldWin = cWindow.getWindow();
      if (!reopen && !!oldWin && !oldWin.closed) {
        oldWin.focus();
        return;
      }

      const newWin = cWindow.open(
        "about:blank",
        `Data Bubbles Iframe Demo`,
        `width=${sizes.width},height=${sizes.height}`
      );

      const htmlTxext = getWindowHtmlText(iframeHtmlText);
      if (newWin) newWin.document.body.innerHTML = htmlTxext;
    },
    [iframeHtmlText]
  );

  return (
    <>
      <Button onClick={() => handleOpen()}>
        {cWindow.isOpen ? "🔼 Focus" : "🖼️ Open"}
      </Button>
      {cWindow.isOpen && (
        <>
          <Button
            disabled={cWindow.getWindow()?.closed ?? false}
            onClick={() => handleOpen(true)}
          >
            🔄 ReOpen
          </Button>
          <Button onClick={() => cWindow.getWindow()?.close()}>❌ Close</Button>
        </>
      )}
    </>
  );
};

export const BlockShareIframe = ({ value }: { value: string }) => {
  const iframeValue = useMemo(() => {
    return `<iframe 
  src="${value}"
  height="${sizes.height}" 
  width="${sizes.width}"
  title="Data Bubbles"
></iframe>`;
  }, [value]);

  return (
    <section className={styles.section_iframe}>
      <Typography>Iframe</Typography>
      <pre className={styles.section_iframe__pre}>{iframeValue}</pre>
      <div className={styles.section_iframe__buttons}>
        <ButtonCopy value={iframeValue} />
        <DividerVertical />
        <ButtonsOpenInWindow iframeHtmlText={iframeValue} />
      </div>
    </section>
  );
};
