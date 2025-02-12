"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPastaPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-52 gap-4">
      <p className="text-7xl bg-bw font-semibold">oops!</p>
      <p className="text-4xl bg-bw">ada kesalahan</p>
      <Button
        size={"lg"}
        className="text-xl"
        onClick={() => router.back()}
      >
        balik
      </Button>
    </div>
  );
}
