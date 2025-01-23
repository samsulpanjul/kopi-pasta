"use client";

import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";
import DataList from "@/components/DataList";
import Filter from "@/components/Filter";
import { useAtom } from "jotai";
import { filterTypeAtom, filterTagsAtom } from "@/state/filterState";

export default function Home() {
  const [filterType] = useAtom(filterTypeAtom);
  const [filterTags] = useAtom(filterTagsAtom);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <Filter />
        <div>
          <p>type: {filterType.join(", ")}</p>
          <p>tags: {filterTags.join(", ")}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <DataList
            key={item.title}
            title={item.title}
            content={item.content}
            id={item.id}
            type={item.type}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
}
