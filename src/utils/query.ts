
export const resolveString = (str: string | string[] | undefined): string => {
  if (Array.isArray(str)) {
    return str[0] || "";
  }
  return str || "";
};