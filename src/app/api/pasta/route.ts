import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";

  const supabase = await createClient();

  if (!id) {
    const { data } = await supabase.from("kopi_pasta_data").select("*");
    return NextResponse.json({ data });
  }

  const pasta = await supabase.from("kopi_pasta_data").select("*").eq("id", id).single();
  if (pasta) {
    return NextResponse.json({ data: pasta });
  }

  return NextResponse.json({ message: "Data not found", data: {} }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";

  const supabase = await createClient();

  if (!id) {
    return NextResponse.json({ message: "Data not found" }, { status: 404 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unautorized" }, { status: 401 });
  }

  const { error } = await supabase.from("kopi_pasta_data").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ message: "Error deleting data" }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" });
}
