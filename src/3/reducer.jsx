import { combineReducers } from "redux";

const contentShowSetting = (state = { bool: false }, action) => {
  if (action.type === "detailTrue") {
    return { bool: true };
  }
  if (action.type === "detailFalse") {
    return { bool: false };
  }
  return { ...state };
};

const contentWriteBoolean = (state = { CWBool: true }, action) => {
  if (action.type === "CWBtrue") return { CWBool: false };
  return { ...state };
};

const DetialReplyview = (state = { DRVset: false }, action) => {
  if (action.type === "DRVsetTrue") {
    return { DRVset: true };
  }
  if (action.type === "DRVsetFalse") {
    return { DRVset: false };
  }
  return { ...state };
};

const Reducers = combineReducers({
  contentShowSetting,
  contentWriteBoolean,
  DetialReplyview,
});

export default Reducers;