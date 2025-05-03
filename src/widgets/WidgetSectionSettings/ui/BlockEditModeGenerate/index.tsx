import type { IData, useDataBubbles } from "@/entities/data-bubbles";
import { Button } from "@/shared/components/buttons/Button";
import { DividerHorizontal } from "@/shared/components/dividers/DividerHorizontal";
import { InputNumber } from "@/shared/components/inputs/InputNumber";
import { InputText } from "@/shared/components/inputs/InputText";
import { InputTextArea } from "@/shared/components/inputs/InputTextArea";
import { Typography } from "@/shared/components/typography/Typography";
import { getLocalStorageValueSafe } from "@/shared/lib/localStorage/getLocalStorageValueSafe";
import { setLocalStorageValueSafe } from "@/shared/lib/localStorage/setLocalStorageValueSafe";
import { useCallback, useMemo, useReducer } from "react";

export const BlockEditModeGenerate = ({
  dataBubbles,
}: {
  dataBubbles: ReturnType<typeof useDataBubbles>;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    getInputValueFromLocalStorage()
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_TITLE", payload: e.target.value });
    },
    []
  );

  const handleBubblesCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 0) {
        dispatch({ type: "SET_BUBBLES_COUNT", payload: value });
      }
    },
    []
  );

  const handleStatesCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 0) {
        dispatch({ type: "SET_STATES_COUNT", payload: value });
      }
    },
    []
  );

  const handleImageSourcesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: "SET_IMAGE_SOURCES", payload: e.target.value });
    },
    []
  );

  const handleNamesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: "SET_NAMES", payload: e.target.value });
    },
    []
  );

  const handleMinValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        dispatch({ type: "SET_MIN_VALUE", payload: value });
      }
    },
    []
  );

  const handleMaxValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        dispatch({ type: "SET_MAX_VALUE", payload: value });
      }
    },
    []
  );

  const handleGenerateClick = useCallback(() => {
    const data = generateRandomBubbleData(state);
    dataBubbles.setData(data);
  }, [state, dataBubbles]);

  const handleResetClick = useCallback(() => {
    dispatch({ type: "SET_INPUTS", payload: initialState });
  }, []);

  const isResetAvailable = useMemo(() => {
    return JSON.stringify(state) != JSON.stringify(initialState);
  }, [state]);

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          backgroundColor: "var(--color-bg-default)",
        }}
      >
        <div style={{ display: "flex", gap: "4px" }}>
          <Button onClick={handleGenerateClick}>🔧 Generate and Apply</Button>
          {isResetAvailable && (
            <Button onClick={handleResetClick}>🔄 Reset Values</Button>
          )}
        </div>
        <DividerHorizontal />
      </div>

      <Typography>Title</Typography>
      <InputText value={state.title} onChange={handleTitleChange} />

      <Typography>Bubbles Count Per State</Typography>
      <InputNumber
        min={1}
        value={state.bubblesCount}
        onChange={handleBubblesCountChange}
      />

      <Typography>States Count</Typography>
      <InputNumber
        min={1}
        value={state.statesCount}
        onChange={handleStatesCountChange}
      />

      <Typography>Image Sources List</Typography>
      <InputTextArea
        value={state.imageSourcesStr}
        onChange={handleImageSourcesChange}
        style={{
          minHeight: "70px",
          resize: "vertical",
        }}
      />

      <Typography>Names List</Typography>
      <InputTextArea
        value={state.namesStr}
        onChange={handleNamesChange}
        style={{
          minHeight: "70px",
          resize: "vertical",
        }}
      />

      <Typography>Min Value</Typography>
      <InputNumber value={state.min} onChange={handleMinValueChange} />

      <Typography>Max Value</Typography>
      <InputNumber value={state.max} onChange={handleMaxValueChange} />
    </>
  );
};

const localStorageKey = "tabs:settings:data_settings:generate:inputs";

const initialState: State = {
  title: "Generated Cats",
  bubblesCount: 100,
  statesCount: 3,
  imageSourcesStr: `https://cataas.com/cat\nhttps://cataas.com/cat?width=100`,
  namesStr: `Felix\nKitty\nTom`,
  min: 10,
  max: 10000,
};

function setInputValueToLocalStorage({ state }: { state: State }) {
  setLocalStorageValueSafe({
    name: localStorageKey,
    value: state,
    expiration: { months: 3 },
  });
}

function getInputValueFromLocalStorage() {
  return getLocalStorageValueSafe<State>({
    name: localStorageKey,
    defaultValue: initialState,
    expiration: { months: 3 },
  });
}

type State = {
  title: string;
  bubblesCount: number;
  statesCount: number;
  namesStr: string;
  imageSourcesStr: string;
  min: number;
  max: number;
};

type Action =
  | { type: "SET_INPUTS"; payload: State }
  | { type: "SET_BUBBLES_COUNT"; payload: number }
  | { type: "SET_STATES_COUNT"; payload: number }
  | { type: "SET_IMAGE_SOURCES"; payload: string }
  | { type: "SET_NAMES"; payload: string }
  | { type: "SET_MIN_VALUE"; payload: number }
  | { type: "SET_MAX_VALUE"; payload: number }
  | { type: "SET_TITLE"; payload: string };

const reducer = (state: State, action: Action): State => {
  let result: State = { ...state };
  switch (action.type) {
    case "SET_INPUTS":
      result = { ...action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_BUBBLES_COUNT":
      result = { ...state, bubblesCount: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_STATES_COUNT":
      result = { ...state, statesCount: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_IMAGE_SOURCES":
      result = { ...state, imageSourcesStr: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_NAMES":
      result = { ...state, namesStr: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_MIN_VALUE":
      result = { ...state, min: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_MAX_VALUE":
      result = { ...state, max: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    case "SET_TITLE":
      result = { ...state, title: action.payload };
      setInputValueToLocalStorage({
        state: result,
      });
      return result;
    default:
      return state;
  }
};

const generateRandomBubbleData = ({
  title,
  bubblesCount,
  statesCount,
  namesStr,
  imageSourcesStr,
  min,
  max,
}: {
  bubblesCount: number;
  statesCount: number;
  namesStr: string;
  imageSourcesStr: string;
  min: number;
  max: number;
  title: string;
}) => {
  const names = namesStr.split("\n").filter((name) => name.trim() !== "");
  const imageSources = imageSourcesStr
    .split("\n")
    .filter((url) => url.trim() !== "");

  const data: IData = {
    title: title,
    state_index: 0,
    states: [],
    definitions: {},
  };

  for (let i = 0; i < statesCount; i++) {
    const stateTitle = `State Index ${i}`;
    const bubbles: Record<string, number> = {};

    const usedNames = new Set<string>();

    for (let j = 0; j < bubblesCount; j++) {
      let name = names[j % names.length] || `Item ${j + 1}`;
      if (usedNames.has(name)) {
        name = `${name} (${j + 1})`;
      }
      usedNames.add(name);
      const value = Math.floor(Math.random() * max - min) + min;
      bubbles[name] = value;

      if (imageSources.length > 0) {
        const imageIndex = j % imageSources.length;
        const src = imageSources[imageIndex];

        data.definitions![name] = {
          img_src: src,
        };
      }
    }

    data.states?.push({
      title: stateTitle,
      bubbles,
    });
  }

  return data;
};
