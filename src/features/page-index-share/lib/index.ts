import type { IData } from "@/entities/data-bubbles";
import * as compressJSON from "compress-json";

/**
 * @todo Generation of PageIndexShare methods
 */
export class PageIndexShare {
  static nameData = "data";

  static getData(sp: URLSearchParams): IData | undefined {
    const value = sp.get(this.nameData);
    if (value) {
      const compressed = JSON.parse(value);
      return compressJSON.decompress(compressed);
    }
  }

  static setData(sp: URLSearchParams, value: IData | undefined) {
    if (!value) {
      sp.delete(this.nameData);
      return;
    }

    const compressed = compressJSON.compress(value);
    sp.set(this.nameData, JSON.stringify(compressed));
  }

  static nameHiddenTabs = "hiddenTabs";

  static getHiddenTabs(sp: URLSearchParams): string[] | undefined {
    const value = sp.get(this.nameHiddenTabs);
    if (value) {
      return JSON.parse(value);
    }
  }

  static setHiddenTabs(sp: URLSearchParams, value: string[] | undefined) {
    if (!value) {
      sp.delete(this.nameHiddenTabs);
      return;
    }
    sp.set(this.nameHiddenTabs, JSON.stringify(value));
  }

  static nameColorBackground = "colorBackground";

  static setColorBackground = (
    sp: URLSearchParams,
    value: string | undefined
  ) => {
    if (!value) {
      sp.delete(this.nameColorBackground);
      return;
    }
    sp.set(this.nameColorBackground, JSON.stringify(value));
  };

  static getColorBackground(sp: URLSearchParams): string | undefined {
    const value = sp.get(this.nameColorBackground);
    if (value) {
      return JSON.parse(value);
    }
  }

  static nameColorText = "colorText";

  static setColorText = (sp: URLSearchParams, value: string | undefined) => {
    if (!value) {
      sp.delete(this.nameColorText);
      return;
    }
    sp.set(this.nameColorText, JSON.stringify(value));
  };

  static getColorText(sp: URLSearchParams): string | undefined {
    const value = sp.get(this.nameColorText);
    if (value) {
      return JSON.parse(value);
    }
  }
}
