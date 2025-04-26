import type { useDataBubbles } from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { DividerHorizontal } from "@/shared/components/dividers/DividerHorizontal";
import { Tabs } from "@/shared/components/tabs/Tabs";
import { useState } from "react";
import { BlockEditModeGenerate } from "../BlockEditModeGenerate";
import { BlockEditModeJSON } from "../BlockEditModeJSON";
import { BlockEditModeUI } from "../BlockEditModeUI";
import { BlockEditModeURL } from "../BlockEditModeURL";

type TMode = "UI" | "JSON" | "URL" | "GENERATE";

export const BlockDataSettings = ({
  dataBubbles,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
}) => {
  const [editMode, setEditMode] = useState<TMode>("JSON");

  return (
    <BlockPartition label="Data Settings">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          values={[
            {
              label: "UI",
              value: "UI",
              disabled: true,
            },
            {
              label: "JSON",
              value: "JSON",
            },
            {
              label: "URL",
              value: "URL",
            },
            {
              label: "Generate",
              value: "GENERATE",
            },
          ]}
          onSelect={({ value }) => {
            setEditMode(value);
          }}
          linePosition="bottom"
          selected={editMode}
        />
      </div>
      {editMode == "UI" && <BlockEditModeUI />}
      {editMode == "JSON" && <BlockEditModeJSON dataBubbles={dataBubbles} />}
      {editMode == "URL" && <BlockEditModeURL dataBubbles={dataBubbles} />}
      {editMode == "GENERATE" && (
        <BlockEditModeGenerate dataBubbles={dataBubbles} />
      )}
    </BlockPartition>
  );
};
