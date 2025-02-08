import DialogTutorial from "@/components/DialogTutorial";
import FormPasta from "@/components/FormPasta";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/server";
import { Info } from "lucide-react";

export default async function CreatePastaPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="mt-8 lg:w-2/4 mx-auto">
      <p className="text-xl mb-4 font-semibold bg-white w-fit">bikin kopi pasta ndiri</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            cara buat <Info />
          </Button>
        </DialogTrigger>
        <DialogTutorial />
      </Dialog>
      <div className="box">
        <FormPasta
          id={user?.id}
          name={user?.user_metadata.name}
          email={user?.user_metadata.email}
          avatar_url={user?.user_metadata.avatar_url}
        />
      </div>
    </div>
  );
}
