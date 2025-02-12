"use client";

import Data from "@/components/Data";
import { deletePasta, getUserPasta } from "@/services/pastaService";
import { PastaType } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function ManagePastaPage() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dataUserPasta"],
    queryFn: getUserPasta,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deletePasta(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataUserPasta"] });
    },
  });

  return (
    <div className="flex flex-col gap-2 mt-4">
      {error && <p>error</p>}
      {isLoading ? (
        <div className="mx-auto bg-bw mt-52">
          <p className="text-4xl">bentar...</p>
        </div>
      ) : (
        <>
          {data.map((item: PastaType) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 ${deleteMutation.isPending ? "bg-white/50" : ""}`}
            >
              <Data
                id={item.id}
                title={item.title}
                content={item.content}
                type={item.type}
                tags={item.tags}
                variables={item.variables}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="bg-red-600 text-white"
                    disabled={deleteMutation.isPending}
                  >
                    hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>yakin mau hapus?</AlertDialogTitle>
                    <AlertDialogDescription>aksi ini ga bisa di-undo dan akan dihapus permanen!</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ga jadi</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        deleteMutation.mutate(item.id);
                      }}
                      className="bg-red-600 text-white"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "tunggu" : "hapus"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
