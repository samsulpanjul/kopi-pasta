"use client";

import { useParams } from "next/navigation";
import Content from "@/components/Content";
import { getSinglePasta } from "@/services/pastaService";
import { useQuery } from "@tanstack/react-query";

export default function ContentPage() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dataSinglePasta", id],
    queryFn: () => getSinglePasta(id),
  });

  return (
    <div>
      {error && (
        <div className="mx-auto mt-52 bg-bw w-fit">
          <p className="text-7xl">error</p>
        </div>
      )}
      {isLoading ? (
        <div className="mx-auto mt-52 bg-bw w-fit">
          <p className="text-7xl">bentar...</p>
        </div>
      ) : (
        <Content
          title={data.data.title}
          content={data.data.content}
          variables={data.data.variables}
          type={data.data.type}
          author={data.data.user_metadata.name}
        />
      )}
    </div>
  );
}
