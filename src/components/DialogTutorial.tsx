import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";

export default function DialogTutorial() {
  return (
    <DialogContent className="lg:max-w-[425px] w-11/12">
      <DialogHeader>
        <DialogTitle>tutor</DialogTitle>
        <DialogDescription>cara buat post-nya. hope you guys understand, sorry if this is not user experience friendly i don't know how to make it works lol</DialogDescription>
      </DialogHeader>
      <div>
        <div>
          <Label>teks kopi pasta</Label>
          <p className="border border-border px-4 py-2">
            Orang yang ngehate <span className="font-semibold">Jerome</span> mungkin dia belum ketemu langsung. Sebaik dan sehumble itu dia sama orang baru salah satunya gw. Gw yg awalnya ga kenal, sekarang malah jadi temen. Semua yang udah
            ketemu dia juga pasti setuju sama pendapat gw.
          </p>
        </div>
        <div>
          <Label>nama karakter</Label>
          <p className="border border-border px-4 py-2 font-semibold">Jerome</p>
          <p className="text-sm">note: nama karakter harus sama kayak yang di teks kopi pasta (yang di-bold)</p>
        </div>
      </div>
    </DialogContent>
  );
}
