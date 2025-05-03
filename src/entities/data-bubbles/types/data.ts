export interface IDataStateBubble {
  name: string;
  displayName?: string;
  imgSrc?: string;
  value: number;
  displayValue?: string;
  color?: {
    text?: string;
    bubble?: string;
    bubbleOnIncrease?: string;
    bubbleOnDecrease?: string;
    bubbleOnNoChange?: string;
  };
}

export type TBubbleDefinition = Pick<IDataStateBubble, "imgSrc">;

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
