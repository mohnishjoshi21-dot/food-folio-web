export const formatZodError = (error: any) => {

  return Object.entries(error.format())
    .filter(([key]) => key !== "_errors")
    .map(([key, val]: any) => `${key}: ${val._errors.join(", ")}`)
    .join("\n");

};