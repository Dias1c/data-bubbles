import type { IData } from "../types";

export const getDataBubblesValueFromUrl = ({
  name,
}: {
  name: string;
}): IData | undefined => {
  const url = new URL(window?.location?.href);
  const data = url.searchParams.get(name);
  if (data) {
    return JSON.parse(data);
  }
};
