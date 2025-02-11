import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./SignOutButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
            <>
              <div className="flex items-center gap-4">
                <p>{user?.user_metadata.name}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"noShadow"}>menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href={"/profile/manage"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <span>manage</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>
                        <SignOutButton />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <Link href={`/auth/login`}>
              <Button>masuk</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
