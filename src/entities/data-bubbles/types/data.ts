export interface IData {
  title?: string;
  states?: IDataState[];
}

export interface IDataState {
  title?: string;
  bubbles?: IDataStateBubble[];
}

export interface IDataStateBubble {
  name: string;
  img_src?: string;
  value: number;
  display_value?: string;
}
