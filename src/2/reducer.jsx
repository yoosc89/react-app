export default function reducer(state, action) {
  if (state === undefined) {
    return {};
  }

  if (action.type === "write_true") {
    return { bool: true };
  }
  if (action.type === "wirte_false") {
    return { bool: false };
  }
  if (action.type >= 0 && action.type <= 20) {
    return { number: action.type };
  }

  const newState = { ...state };
  return newState;
}
