export function isValidTranslation(data: any) {
  if (!Array.isArray(data)) return false;

  if (data.length !== 4) return false;

  return data.every(
    (item) =>
      item.language &&
      item.title &&
      item.content &&
      typeof item.language === "string" &&
      typeof item.title === "string" &&
      typeof item.content === "string"
  );
}
