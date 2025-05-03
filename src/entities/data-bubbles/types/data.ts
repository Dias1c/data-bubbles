export interface IDataStateBubble {
  name: string;
  img_src?: string;
  value: number;
  display_value?: string;
  color?: {
    text?: string;
    bubble?: string;
    bubble_on_increase?: string;
    bubble_on_decrease?: string;
    bubble_on_no_change?: string;
  };
}

export type TBubbleDefinition = Pick<IDataStateBubble, "img_src">;

export interface IData {
  title?: string;
  state_index?: number;
  states?: IDataState[];
  definitions?: Record<string, TBubbleDefinition>;
}

export type TDataStateBubbleRecord = Omit<IDataStateBubble, "name"> | number;

export interface IDataState {
  title?: string;
  bubbles?: IDataStateBubble[] | Record<string, TDataStateBubbleRecord>;
}
