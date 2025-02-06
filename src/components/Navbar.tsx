import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky z-50 w-full top-2">
      <div className="box flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl">kopi-pasta</p>
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <p>{user?.user_metadata.name}</p>
              <SignOutButton />
            </div>
          ) : (
            <Link href={`/auth/login`}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
