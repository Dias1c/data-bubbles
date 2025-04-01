import type { IDrawerDataBubblesColors } from "@/entities/data-bubbles";
import { CUserStoreElement } from "../CUserStoreElement";

export class CUserStore {
  static drawerColors = new CUserStoreElement<IDrawerDataBubblesColors>({
    name: "user-store:drawerColors",
  });
}
