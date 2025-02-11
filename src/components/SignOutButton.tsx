"use client";

import { signOut } from "@/utils/auth/actions";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button
      className="w-full"
      variant={"noShadow"}
      onClick={signOut}
    >
      keluar
    </Button>
  );
}
