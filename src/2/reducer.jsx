import { combineReducers } from "redux";

export function PageNumber(state = { number: 0 }, action) {
  if (action.type >= 0) {
    return { number: action.type };
  }
  return { ...state };
}

export function WriteLoadButton(state = { bool: false }, action) {
  switch (action.type) {
    case "WRload":
      return { bool: true };
    case "WRclose":
      return { bool: false };
    default:
      return { ...state };
  }
}

export function TableReload(state = { bool: false }, action) {
  if (action.type === "Treload") {
    return { reload: Math.random() };
  }
  return { ...state };
}

export function DefaultContent(
  state = { id: "", title: "", writer: "", content: "", disablewriter: "" },
  action
) {
  if (action.type !== undefined) {
    return {
      id: action.type.id,
      title: action.type.title,
      writer: action.type.writer,
      content: action.type.content,
      disablewriter: action.type.disablewriter,
    };
  }

  return { ...state };
}

export function ModifyWrite(state = { modify: false }, action) {
  switch (action.type) {
    case "MWrite":
      return { modify: false, modifyname: "글쓰기" };
    case "MModify":
      return { modify: true, modifyname: "수정" };
    default:
      return { ...state };
  }
}

const Reducers = combineReducers({
  PageNumber,
  WriteLoadButton,
  TableReload,
  DefaultContent,
  ModifyWrite,
});

export default Reducers;
