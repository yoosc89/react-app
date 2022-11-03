import { combineReducers } from "redux";

export function PageNumber(state, action) {
  if (state === undefined) {
    return { number: 0 };
  }
  if (action.type >= 0) {
    return { number: action.type };
  }

  const newState = { ...state };
  return newState;
}

export function WriteLoadButton(state, action) {
  if (state === undefined) {
    return { bool: false };
  }
  if (action.type === "WRload") {
    return { bool: true };
  }
  if (action.type === "WRclose") {
    return { bool: false };
  }
  const newState = { ...state };
  return newState;
}

export function TableReload(state, action) {
  if (state === undefined) {
    return { bool: false };
  }
  if (action.type === "Treload") {
    return { reload: Math.random() };
  }

  const newState = { ...state };
  return newState;
}

export function DefaultContent(state, action) {
  if (action.type !== undefined) {
    return {
      title: action.type.title,
      writer: action.type.writer,
      content: action.type.content,
      disablewriter: action.type.disablewriter,
    };
  }
}
const Reducers = combineReducers({
  PageNumber: PageNumber,
  WriteLoadButton: WriteLoadButton,
  TableReload: TableReload,
  DefaultContent: DefaultContent,
});

export default Reducers;
