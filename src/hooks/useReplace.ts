import { useState, useEffect } from "react";

type ReplacementData = {
  [key: string]: string;
};

/**
 * Custom hook untuk mengganti placeholder dalam template string
 * @param template - Template string dengan placeholder (e.g., "Hello {{name}}")
 * @param data - Objek data untuk mengganti placeholder (e.g., { name: "John" })
 * @returns Hasil string dengan placeholder yang sudah diganti
 */

const useReplace = (template: string, data: ReplacementData): string => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const replacePlaceholders = (text: string, data: ReplacementData): string => {
      return text.replace(/{{(.*?)}}/g, (_, key) => {
        return data[key.trim()] || `{{${key}}}`;
      });
    };

    setResult(replacePlaceholders(template, data));
  }, [template, data]);

  return result;
};

export default useReplace;
