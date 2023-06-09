export const isEmptyObject = (value) => {
  return !(
    value &&
    typeof value === "object" &&
    Object.keys(value).length !== 0
  );
};
