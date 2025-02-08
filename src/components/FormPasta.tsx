"use client";

import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAtom } from "jotai";
import { tagsAtom } from "@/state/filterState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UserType } from "@/types/type";

const FormSchema = z.object({
  title: z.string().nonempty({ message: "judul boleh kosong" }),
  content: z.string().nonempty({ message: "teks ga boleh kosong" }),
  data: z.object({
    name: z.string(),
  }),
  type: z.enum(["static", "dynamic"]),
});

export default function FormPasta({ id, name, email, avatar_url }: UserType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", content: "", data: { name: "" }, type: "dynamic" },
  });

  const [tags] = useAtom(tagsAtom);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsMessage, setTagsMessage] = useState<string>("");

  const handleSubmit = (value: z.infer<typeof FormSchema>) => {
    if (selectedTags.length === 0) {
      setTagsMessage("minimal pilih 1 tag");
      return;
    }

    if (value.data.name && value.type === "static") {
      value.data.name = "";
    }

    console.log({ ...value, id, name, email, avatar_url, tags: selectedTags });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>judul</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mika"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>teks kopi pasta</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("type") === "dynamic" && (
          <FormField
            control={form.control}
            name="data.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>nama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>tipe</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-6"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dynamic" />
                    </FormControl>
                    <FormLabel>dynamic</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="static" />
                    </FormControl>
                    <FormLabel>static</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="font-bold text-sm">tags</p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={"active"}
                size={"sm"}
                className={selectedTags.includes(tag) ? "translate-x-boxShadowX translate-y-boxShadowY bg-main" : "shadow-shadow bg-bw"}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTags((prev) => (selectedTags.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
          <p>{tagsMessage}</p>
        </div>
        <Button
          type="submit"
          className="mt-4"
          variant={"reverse"}
        >
          post
        </Button>
      </form>
    </Form>
  );
}
