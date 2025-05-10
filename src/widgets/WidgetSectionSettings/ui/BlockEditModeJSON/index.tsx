import type { useDataBubbles } from "@/entities/data-bubbles";
import { Button } from "@/shared/components/buttons/Button";
import { useState } from "react";
import { ButtonExportJson } from "../ButtonExportJson";
import { ButtonImportJson } from "../ButtonImportJson";
import styles from "./styles.module.css";
import { InputTextArea } from "@/shared/components/inputs/InputTextArea";

export const BlockEditModeJSON = ({
  dataBubbles,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
}) => {
  const [error, setError] = useState<string>();

  const [value, setValue] = useState(
    JSON.stringify(dataBubbles.getData(), undefined, "  ")
  );

  return (
    <>
      <div className={styles.section_controllers_system_buttons}>
        <ButtonExportJson
          data={dataBubbles.getData()}
          filename={dataBubbles.getData().title ?? "data-bubbles"}
        >
          📤 Export
        </ButtonExportJson>
        <ButtonImportJson onSuccess={({ json }) => setValue(json)}>
          📥 Import
        </ButtonImportJson>
      </div>
      {/* <a href="https://github.com/Dias1c/data-bubbles" target="_blank">
        📌 Documentation
      </a> */}
      <InputTextArea
        style={{
          minHeight: "380px",
          resize: "none",
        }}
        value={value}
        onChange={(e) => {
          const text = e?.target?.value ?? "";
          setValue(text);
          try {
            const data = JSON.parse(text);
            dataBubbles.setData(data);
            setError("");
          } catch (error) {
            if (error instanceof Error) {
              setError(error?.message ?? "");
            }
          }
        }}
      />
      {!!error && (
        <span className={styles.text_error} title={error}>
          {error}
        </span>
      )}
      <div>
        <Button
          disabled={!!error}
          onClick={() => {
            setValue((v) => {
              return JSON.stringify(JSON.parse(v), undefined, "  ");
            });
          }}
        >
          👌 Format
        </Button>
      </div>
    </>
  );
};
