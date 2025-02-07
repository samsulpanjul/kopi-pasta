"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-52 text-center bg-white py-8">
      <div>
        <p className="text-6xl font-bold">404</p>
        <p className="text-4xl">halaman ga ketemu</p>
      </div>
      <Button
        className="w-fit"
        onClick={() => router.back()}
      >
        balik
      </Button>
    </div>
  );
}
