import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: errorUser,
  } = await supabase.auth.getUser();

  if (!user || errorUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase.from("kopi_pasta_data").select("*").eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ message: "Error when fetching data!" }, { status: 500 });
  }
  if (data) {
    return NextResponse.json({ data });
  }
}
