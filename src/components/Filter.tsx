"use client";

import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useAtom } from "jotai";
import { filterTypeAtom, filterTagsAtom } from "@/state/filterState";

const tags = ["halu", "gws", "klarifikasi", "???"];

export default function Filter() {
  const [filterType, setFilterType] = useAtom(filterTypeAtom);
  const [filterTags, setFilterTags] = useAtom(filterTagsAtom);

  const handleFilterType = (type: string) => {
    setFilterType((prevType: string[]) => (prevType.includes(type) ? prevType.filter((t) => t !== type) : [...prevType, type]));
  };

  const handleFilterTags = (tags: string) => {
    setFilterTags((prevType: string[]) => (prevType.includes(tags) ? prevType.filter((t) => t !== tags) : [...prevType, tags]));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>filter</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-[300px] mb-12">
          <DrawerHeader>
            <DrawerTitle>filter</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4">
            <div>
              <p>tipe?</p>
              <div className="flex gap-2">
                <Button
                  className={filterType.includes("static") ? "translate-x-boxShadowX translate-y-boxShadowY" : "shadow-shadow hover:shadow-none"}
                  variant={"active"}
                  size={"sm"}
                  onClick={() => handleFilterType("static")}
                >
                  static
                </Button>
                <Button
                  className={filterType.includes("dynamic") ? "translate-x-boxShadowX translate-y-boxShadowY" : "shadow-shadow hover:shadow-none"}
                  variant={"active"}
                  size={"sm"}
                  onClick={(e) => handleFilterType("dynamic")}
                >
                  dynamic
                </Button>
              </div>
            </div>
            <div>
              <p>tags</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <Button
                    className={filterTags.includes(tag) ? "translate-x-boxShadowX translate-y-boxShadowY opacity-75" : "shadow-shadow hover:shadow-none"}
                    variant={"active"}
                    key={tag}
                    size={"sm"}
                    onClick={() => handleFilterTags(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
