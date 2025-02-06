"use client";

import { signInWithGoogle } from "@/utils/auth/actions";
import { Button } from "./ui/button";

export default function SignInWithGoogleButton() {
  return (
    <Button
      type="button"
      className="w-full"
      onClick={() => signInWithGoogle()}
    >
      sign in with google
    </Button>
  );
}
