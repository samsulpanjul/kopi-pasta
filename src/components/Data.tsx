"use client";

import { useState } from "react";
import Link from "next/link";
import useReplace from "@/hooks/useReplace";

import { useAtom } from "jotai";
import { filterTypeAtom, filterTagsAtom } from "@/state/filterState";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronsUpDown } from "lucide-react";

export default function Data({ title, content, id, type, tags, variables }: { title: string; content: string; id: string; type: string; tags: string[]; variables: { name: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType] = useAtom(filterTypeAtom);
  const [filterTags] = useAtom(filterTagsAtom);
  const replace = useReplace(content, variables);

  const filtered = (!filterType.includes(type) && filterType.length !== 0) || (filterTags.length !== 0 && !tags.some((tag) => filterTags.includes(tag)));

  if (filtered) {
    return null;
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-1 relative w-full"
    >
      <div className="absolute -top-1 -left-2">
        <Badge variant={"neutral"}>
          {type}. {tags.join(", ")}
        </Badge>
      </div>
      <div className="rounded-base flex items-center justify-between space-x-4 border-2 border-border text-mtext bg-main px-4 py-2">
        <Link
          href={`/pasta/${id}`}
          className="w-full py-2"
        >
          <h4 className="text-sm font-heading line-clamp-1 lg:line-clamp-2">{title}</h4>
        </Link>
        <CollapsibleTrigger asChild>
          <Button
            variant="noShadow"
            size="sm"
            className="bg-bw text-text p-2"
          >
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 text-mtext font-base">
        <div className="rounded-base border-2 border-border bg-main px-4 py-3 text-sm">
          <p
            className="line-clamp-4 font-medium"
            dangerouslySetInnerHTML={{ __html: replace }}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
