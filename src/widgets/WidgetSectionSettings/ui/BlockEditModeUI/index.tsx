import type { useDataBubbles } from "@/entities/data-bubbles";
import { Button } from "@/shared/components/buttons/Button";
import { DividerHorizontal } from "@/shared/components/dividers/DividerHorizontal";
import { InputText } from "@/shared/components/inputs/InputText";
import { Typography } from "@/shared/components/typography/Typography";

export const BlockEditModeUI = ({
  dataBubbles,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
}) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <p style={{ color: "orange" }}>
        UI not finished, please switch to the JSON mode
      </p>
      <SectionTitle dataBubbles={dataBubbles} />
      <DividerHorizontal />
    </section>
  );
};

const SectionTitle = ({
  dataBubbles,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
}) => {
  const title = dataBubbles?.getData()?.title ?? "";

  return (
    <section>
      <Typography>Title</Typography>
      <div
        style={{
          display: "flex",
          gap: "4px",
        }}
      >
        <InputText
          style={{
            flex: 1,
            minWidth: 0,
          }}
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            const data = dataBubbles.getData();

            if (value) {
              dataBubbles.setData({
                ...data,
                title: value,
              });
              return;
            }

            dataBubbles.setData({
              ...data,
              title: undefined,
            });
          }}
        />
        {!!title && (
          <Button
            onClick={() => {
              const data = dataBubbles.getData();

              dataBubbles.setData({
                ...data,
                title: undefined,
              });
            }}
          >
            ❌
          </Button>
        )}
      </div>
    </section>
  );
};
