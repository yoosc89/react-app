export default function reducer(state, action) {
  if (state === undefined) {
    return {};
  } else if (action.type === "write_true") {
    return { bool: true };
  } else if (action.type === "write_false") {
    return { bool: false };
  } else if (action.type >= 0 && action.type <= 20) {
    return { number: action.type };
  }
  return;
}
