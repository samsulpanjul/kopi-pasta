import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CreatePastaButton() {
  return (
    <Link
      href={`/pasta/create`}
      className="w-fit"
    >
      <Button className="fixed bottom-8 right-8 z-50 lg:static">
        <SquarePen />
        <p className="max-lg:hidden">bikin kopi pasta</p>
      </Button>
    </Link>
  );
}
