import type { IData } from "@/entities/data-bubbles";

/**
 * @todo Generation of PageIndexShare methods
 */
export class PageIndexShare {
  static nameData = "data";

  static getData(sp: URLSearchParams): IData | undefined {
    const value = sp.get(this.nameData);
    if (value) {
      return JSON.parse(value);
    }
  }

  static setData(sp: URLSearchParams, value: IData | undefined) {
    if (!value) {
      sp.delete(this.nameData);
      return;
    }
    sp.set(this.nameData, JSON.stringify(value));
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
}
