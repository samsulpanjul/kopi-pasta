"use client";

import Data from "@/components/Data";
import Filter from "@/components/Filter";
import { useAtom } from "jotai";
import { filterTypeAtom, filterTagsAtom } from "@/state/filterState";
import CreatePastaButton from "@/components/CreatePastaButton";
import { PastaType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { getAllPasta } from "@/services/pastaService";
import PaginationButton from "@/components/Pagination";
import { currentPageAtom } from "@/state/state";

export default function Home() {
  const [filterType] = useAtom(filterTypeAtom);
  const [filterTags] = useAtom(filterTagsAtom);

  const { data, error, isLoading } = useQuery({
    queryKey: ["dataPasta"],
    queryFn: getAllPasta,
  });

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data?.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:w-3/4 lg:mx-auto mt-4 mb-8">
      <div className="flex flex-col gap-4">
        <CreatePastaButton />
        <div className="flex gap-4">
          <Filter />
          <div className="lg:hidden">
            <p className="w-fit bg-bw">type: {filterType.join(", ")}</p>
            <p className="w-fit bg-bw">tags: {filterTags.join(", ")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:w-3/4">
        {error && <p>error</p>}
        {isLoading ? (
          <div className="mx-auto bg-bw mt-52">
            <p className="text-4xl">bentar...</p>
          </div>
        ) : (
          <>
            {currentData.map((item: PastaType) => (
              <Data
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                type={item.type}
                tags={item.tags}
                variables={item.variables}
              />
            ))}
            <PaginationButton
              currentPage={currentPage}
              data={data}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
