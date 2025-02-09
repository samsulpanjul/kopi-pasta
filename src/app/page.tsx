"use client";

import data from "@/data/data.json";
import DataList from "@/components/DataList";
import Filter from "@/components/Filter";
import { useAtom } from "jotai";
import { filterTypeAtom, filterTagsAtom } from "@/state/filterState";
import CreatePastaButton from "@/components/CreatePastaButton";

export default function Home() {
  const [filterType] = useAtom(filterTypeAtom);
  const [filterTags] = useAtom(filterTagsAtom);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:w-3/4 lg:mx-auto h-[2000px] mt-4">
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
        {data.map((item) => (
          <DataList
            key={item.title}
            title={item.title}
            content={item.content}
            id={item.id}
            type={item.type}
            tags={item.tags}
            name={item.variables?.name}
          />
        ))}
      </div>
    </div>
  );
}
