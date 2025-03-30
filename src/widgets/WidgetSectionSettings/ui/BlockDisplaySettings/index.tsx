import {
  getDrawerDataBubblesDefaultColors,
  type useDrawerDataBubbles,
} from "@/entities/data-bubbles";
import { BlockPartition } from "@/shared/components/blocks/BlockPartition";
import { Button } from "@/shared/components/buttons/Button";
import { FieldCheckbox } from "@/shared/components/input_fields/FieldCheckbox";
import { Checkbox } from "@/shared/components/inputs/Checkbox";
import { InputText } from "@/shared/components/inputs/InputText";
import { Typography } from "@/shared/components/typography/Typography";
import { useStateMemorized } from "@/shared/hooks/useStateMemorized";
import { useCallback, useState } from "react";

interface IColors {
  background?: string;
  bubbleText?: string;
  bubbleNoChanges?: string;
  bubbleOnValueUp?: string;
  bubbleOnValueDown?: string;
}

export const BlockDisplaySettings = ({
  colors,
}: {
  colors: ReturnType<typeof useDrawerDataBubbles>["colors"];
}) => {
  const [hidden, setHidden] = useStateMemorized({
    name: "tabs:settings:hide_display_settings",
    defaultValue: false,
    expiration: {
      months: 3,
    },
  });

  if (hidden) {
    return (
      <label
        style={{
          display: "flex",
        }}
      >
        <Checkbox
          checked={!hidden}
          onChange={(v) => setHidden(!v.target.checked)}
        />
        <Typography>Display Settings</Typography>
      </label>
    );
  }

  return (
    <BlockPartition
      label="Display Settings"
      childrenTitleEnd={
        <FieldCheckbox
          checked={hidden}
          onChange={(v) => setHidden(v.target.checked)}
          label="Hide"
        />
      }
    >
      <BlockColors colors={colors} />
    </BlockPartition>
  );
};

const BlockColors = ({
  colors,
}: {
  colors: ReturnType<typeof useDrawerDataBubbles>["colors"];
}) => {
  const [colorsValues, setColorsValues] = useState<IColors>({
    background: colors.colorBackground.getValue(),
    bubbleText: colors.colorBubbleText.getValue(),
  });

  const setColorValue = useCallback(
    (name: keyof IColors, value?: string) => {
      setColorsValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      const variant: Record<
        keyof IColors,
        typeof colors.colorBackground | undefined
      > = {
        background: colors.colorBackground,
        bubbleText: colors.colorBubbleText,
        bubbleNoChanges: undefined,
        bubbleOnValueDown: undefined,
        bubbleOnValueUp: undefined,
      };

      const modifier = variant[name];
      if (!modifier) return;

      if (value) {
        modifier.setValue(value);
      } else {
        modifier.reset();
      }
    },
    [colors]
  );

  const onClickReset = useCallback(() => {
    const defaultColors = getDrawerDataBubblesDefaultColors();

    setColorValue("background", defaultColors.background);
    setColorValue("bubbleText", defaultColors.bubbleText);
  }, [setColorValue]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Colors</Typography>
        <Button onClick={onClickReset}>↩️ Reset</Button>
      </div>
      <Typography>Background</Typography>
      <InputText
        onChange={(e) => {
          setColorValue("background", e.target.value || undefined);
        }}
        value={colorsValues?.background ?? ""}
      />
      <Typography>Bubble Text</Typography>
      <InputText
        onChange={(e) => {
          setColorValue("bubbleText", e.target.value || undefined);
        }}
        value={colorsValues?.bubbleText ?? ""}
      />
      {/*
      <Typography>Bubble onValueUp</Typography>
      <InputText
        onChange={(e) => {
          setColorValue("bubbleOnValueUp", e.target.value || undefined);
        }}
        value={colorsValues?.bubbleOnValueUp ?? ""}
      />
      <Typography>Bubble onValueDown</Typography>
      <InputText
        onChange={(e) => {
          setColorValue("bubbleOnValueDown", e.target.value || undefined);
        }}
        value={colorsValues?.bubbleOnValueDown ?? ""}
      />
      <Typography>Bubble noChanges</Typography>
      <InputText
        onChange={(e) => {
          setColorValue("bubbleNoChanges", e.target.value || undefined);
        }}
        value={colorsValues?.bubbleNoChanges ?? ""}
      />
          */}
    </>
  );
};
