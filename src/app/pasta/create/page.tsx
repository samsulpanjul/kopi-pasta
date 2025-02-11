import DialogTutorial from "@/components/DialogTutorial";
import FormPasta from "@/components/FormPasta";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default async function CreatePastaPage() {
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
        <FormPasta />
      </div>
    </div>
  );
}
