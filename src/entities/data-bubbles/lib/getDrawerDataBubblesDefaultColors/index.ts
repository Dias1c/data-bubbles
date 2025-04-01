import type { IDrawerDataBubblesColors } from "../drawer/DrawerDataBubbles";

export const getDrawerDataBubblesDefaultColors =
  (): Required<IDrawerDataBubblesColors> => {
    const computedStyle = getComputedStyle(document.body);

    return {
      background: computedStyle.getPropertyValue("--color-bg-default"),
      bubbleText: computedStyle.getPropertyValue("--color-fg-default"),
      bubbleOnValueDown: "#ff0000",
      bubbleOnValueUp: "#00ff00",
      bubbleOnNoChanges: "#ffffff",
    };
  };
