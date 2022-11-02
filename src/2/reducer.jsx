export default function reducer(state, action) {
  const newState = { ...state };
  if (state === undefined) {
    return {};
  }

  if (action.type === "write_true") {
    return { bool: true };
  }
  if (action.type === "write_false") {
    return { bool: false };
  }
  if (action.type >= 0 && action.type <= 20) {
    return { number: action.type };
  }

  return newState;
}
