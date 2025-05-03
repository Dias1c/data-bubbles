import type { IDrawerDataBubblesColors } from "../drawer/DrawerDataBubbles";

export const getDrawerDataBubblesDefaultColors =
  (): Required<IDrawerDataBubblesColors> => {
    const computedStyle = getComputedStyle(document.body);

    return {
      background: computedStyle.getPropertyValue("--color-bg-default"),
      bubbleText: computedStyle.getPropertyValue("--color-fg-default"),
      bubbleOnDecrease: "#ff0000",
      bubbleOnIncrease: "#00ff00",
      bubbleOnNoChange: "#ffffff",
    };
  };
