"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPastaPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-52 gap-4">
      <p className="text-7xl bg-bw font-semibold">404</p>
      <p className="text-4xl bg-bw">halaman ga ketemu</p>
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
