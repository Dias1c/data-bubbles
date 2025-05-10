import type { useDataBubbles } from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { DividerHorizontal } from "@/shared/components/dividers/DividerHorizontal";
import { Tabs } from "@/shared/components/tabs/Tabs";
import { useState } from "react";
import { BlockEditModeGenerate } from "../BlockEditModeGenerate";
import { BlockEditModeJSON } from "../BlockEditModeJSON";
import { BlockEditModeLink } from "../BlockEditModeLink";
import { BlockEditModeUI } from "../BlockEditModeUI";

type TMode = "UI" | "JSON" | "LINK" | "GENERATE";

export const BlockDataSettings = ({
  dataBubbles,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
}) => {
  const [editMode, setEditMode] = useState<TMode>("JSON");

  return (
    <BlockPartition
      label="Data Settings By:"
      style={{
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          backgroundColor: "var(--color-bg-default)",
        }}
      >
        <Tabs
          values={[
            {
              label: "🎛️ UI",
              value: "UI",
            },
            {
              label: "📝 JSON",
              value: "JSON",
            },
            {
              label: "🔗 Link",
              value: "LINK",
            },
            {
              label: "🎲 Generate",
              value: "GENERATE",
            },
          ]}
          onSelect={({ value }) => {
            setEditMode(value);
          }}
          linePosition="bottom"
          selected={editMode}
        />
        <DividerHorizontal />
      </div>
      {editMode == "UI" && <BlockEditModeUI dataBubbles={dataBubbles} />}
      {editMode == "JSON" && <BlockEditModeJSON dataBubbles={dataBubbles} />}
      {editMode == "LINK" && <BlockEditModeLink dataBubbles={dataBubbles} />}
      {editMode == "GENERATE" && (
        <BlockEditModeGenerate dataBubbles={dataBubbles} />
      )}
    </BlockPartition>
  );
};
