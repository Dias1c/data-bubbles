interface IColors {
  background: string;
  bubbleText: string;
}

export const getDrawerDataBubblesDefaultColors = (): Required<IColors> => {
  const computedStyle = getComputedStyle(document.body);

  return {
    background: computedStyle.getPropertyValue("--color-bg-default"),
    bubbleText: computedStyle.getPropertyValue("--color-fg-default"),
  };
};
