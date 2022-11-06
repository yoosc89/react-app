import { combineReducers } from "redux";

const contentShowSetting = (state = { bool: false }, action) => {
  if (action.type === false) {
    return { bool: action.type };
  }
  if (action.type === true) {
    return { bool: action.type };
  }
  return { ...state };
};

const detailNumber = (state = { num: 0 }, action) => {
  if (Number(action.type) > 0) {
    return { num: action.type };
  }
  return { ...state };
};

const contentWriteBoolean = (state = { CWBool: true }, action) => {
  if (action.type === "CWBtrue") return { CWBool: false };
  return { ...state };
};

const Reducers = combineReducers({
  contentShowSetting,
  detailNumber,
  contentWriteBoolean,
});

export default Reducers;
