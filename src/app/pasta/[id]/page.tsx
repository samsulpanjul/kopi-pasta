"use client";

import { useParams } from "next/navigation";
import data from "@/data/data.json";
import Content from "@/components/Content";

export default function ContentPage() {
  const { id }: { id: any } = useParams();
  const { title, content, data: placeholder, type } = data[id - 1];

  return (
    <div>
      <Content
        title={title}
        content={content}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
