"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import useReplace from "@/hooks/useReplace";
import { Button } from "./ui/button";

export default function Content({ title, content, variables, type, author }: { title: string; content: string; variables: { name: string }; type: string; author: string }) {
  const [text, setText] = useState(variables);
  const [copyText, setCopyText] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const replace = useReplace(content, text);

  const handleCopy = () => {
    setCopyText(true);
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current?.textContent ?? "");
    }
    setTimeout(() => setCopyText(false), 2000);
  };

  return (
    <div className="mt-4 flex flex-col gap-2 lg:w-2/4 mx-auto">
      <div className="relative w-fit">
        <h2 className="text-xl font-semibold underline bg-white">{title}</h2>
      </div>
      {type === "dynamic" && (
        <Input
          type="text"
          placeholder="masukkan nama karakter"
          value={text.name}
          onChange={(e) => setText({ name: e.target.value })}
        />
      )}
      <div className="box relative mt-4 py-4">
        <Button
          className="absolute -top-5 -right-3 text-xs"
          size={"xs"}
          variant={"noShadow"}
          onClick={handleCopy}
        >
          {copyText ? "disalin!" : "salin"}
        </Button>
        <div className="max-h-[600px] overflow-auto scrollbar">
          <p
            ref={textRef}
            className="whitespace-pre-line mr-2"
            dangerouslySetInnerHTML={{ __html: replace }}
          />
        </div>
      </div>
      <div className="bg-bw">— {author}</div>
    </div>
  );
}
