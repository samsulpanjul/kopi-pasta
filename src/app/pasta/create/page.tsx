"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai";
import { tagsAtom } from "@/state/filterState";
import { useState } from "react";

export default function CreatePastaPage() {
  const [tags] = useAtom(tagsAtom);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  console.log(selectedTags);

  return (
    <div className="box mt-8 lg:w-2/4 mx-auto">
      <p className="text-xl underline mb-4 font-semibold">bikin kopi pasta ndiri</p>
      <form
        action=""
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="title">judul</Label>
          <Input
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="content">teks kopi pasta</Label>
          <Textarea
            name="content"
            id="content"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="character">nama karakter</Label>
          <Input
            type="text"
            id="character"
            name="character"
          />
        </div>
        <div>
          <p>tipe</p>
          <RadioGroup
            defaultValue="static"
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="static"
                id="static"
              />
              <Label htmlFor="static">static</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="dynamic"
                id="dynamic"
              />
              <Label htmlFor="dynamic">dynamic</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <p>tags</p>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={"active"}
                className={selectedTags.includes(tag) ? "translate-x-boxShadowX translate-y-boxShadowY" : "shadow-shadow"}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTags((prev) => (selectedTags.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          onClick={(e) => e.preventDefault()}
          className="mt-4"
          variant={"reverse"}
        >
          post
        </Button>
      </form>
    </div>
  );
}
