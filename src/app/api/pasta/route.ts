import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const { error } = await supabase
      .from("kopi_pasta_data")
      .insert([
        {
          ...body,
          user_id: user.id,
          user_metadata: {
            name: user.user_metadata.name,
            email: user.email,
            avatar_url: user.user_metadata.avatar_url,
          },
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ message: "Error insert data", error }, { status: 500 });
  }
}

export async function GET() {
  const supabase = await createClient();

  const { data } = await supabase.from("kopi_pasta_data").select("*");

  return NextResponse.json({ data });
}
