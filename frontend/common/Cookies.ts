export const WriteCookie = (key: string, value: string, expires?: number) => {
  const date: Date = new Date();
  date.setDate(date.getDate() + (expires ?? 365));

  return (document.cookie =
    key + "=" + value + ";  expires=" + date.toUTCString() + "; path=/");
};
