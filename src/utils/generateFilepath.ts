import { IP_ADDRESS } from "../config";

export const generateFilePath = (path: string): string => {
  const filePath = path.split("\\")[1];

  return IP_ADDRESS + `public/` + filePath;
};
