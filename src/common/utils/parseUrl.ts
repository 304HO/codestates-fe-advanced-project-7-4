export const changeUrl = (url: string) =>
  url
    .replace(/^(https?:\/\/)?(www\.)?/, "")
    .split("/")
    .join("");
