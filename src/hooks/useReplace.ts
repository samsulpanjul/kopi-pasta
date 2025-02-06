import { useState, useEffect } from "react";

type ReplacementData = {
  [key: string]: string;
};

/**
 * Custom hook untuk mengganti placeholder dalam template string
 * @param template - Template string dengan placeholder (e.g., "Hello {{name}}")
 * @param variables - Objek data untuk mengganti placeholder (e.g., { name: "John" })
 * @returns Hasil string dengan placeholder yang sudah diganti
 */

const useReplace = (template: string, variables: ReplacementData): string => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const replacePlaceholders = (text: string, variables: ReplacementData): string => {
      return text.replace(/{{(.*?)}}/g, (_, key) => {
        return variables[key.trim()] || `{{${key}}}`;
      });
    };

    setResult(replacePlaceholders(template, variables));
  }, [template, variables]);

  return result;
};

export default useReplace;
