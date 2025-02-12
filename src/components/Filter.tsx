"use client";

import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useAtom, useSetAtom } from "jotai";
import { filterTypeAtom, filterTagsAtom, tagsAtom, typesAtom } from "@/state/filterState";
import { currentPageAtom } from "@/state/state";

export default function Filter() {
  return (
    <div>
      <div className="lg:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>filter</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-[300px] mb-12">
              <DrawerHeader>
                <DrawerTitle>filter</DrawerTitle>
              </DrawerHeader>
              <FilterList />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden lg:block">
        <div className="mx-auto w-[300px] mb-12">
          <div>
            <p className="font-bold">filter</p>
          </div>
          <FilterList />
        </div>
      </div>
    </div>
  );
}

function FilterList() {
  const [types] = useAtom(typesAtom);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);
  const [tags] = useAtom(tagsAtom);
  const [filterTags, setFilterTags] = useAtom(filterTagsAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);

  const handleFilterType = (type: string) => {
    setFilterType((prevType: string[]) => (prevType.includes(type) ? prevType.filter((t) => t !== type) : [...prevType, type]));
  };

  const handleFilterTags = (tags: string) => {
    setFilterTags((prevTag: string[]) => (prevTag.includes(tags) ? prevTag.filter((t) => t !== tags) : [...prevTag, tags]));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="w-fit bg-bw">tipe?</p>
        <div className="flex gap-2">
          {types.map((type) => (
            <Button
              key={type}
              className={filterType.includes(type) ? "translate-x-boxShadowX translate-y-boxShadowY" : "shadow-shadow"}
              variant={"active"}
              size={"sm"}
              onClick={() => {
                handleFilterType(type);
                setCurrentPage(1);
              }}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p className="w-fit bg-bw">tags</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Button
              className={filterTags.includes(tag) ? "translate-x-boxShadowX translate-y-boxShadowY" : "shadow-shadow"}
              variant={"active"}
              key={tag}
              size={"sm"}
              onClick={() => {
                handleFilterTags(tag);
                setCurrentPage(1);
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
