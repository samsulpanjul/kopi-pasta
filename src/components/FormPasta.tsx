"use client";

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
import { Checkbox } from "./ui/checkbox-button";

const FormSchema = z
  .object({
    title: z.string().trim().nonempty({ message: "judul boleh kosong" }),
    content: z.string().trim().nonempty({ message: "teks ga boleh kosong" }),
    data: z.object({
      name: z.string().trim(),
    }),
    type: z.enum(["static", "dynamic"]),
    tags: z.string().array().nonempty({ message: "pilih salah satu tag" }),
  })
  .superRefine((data, ctx) => {
    if (data.type === "dynamic" && !data.data.name.length) {
      ctx.addIssue({
        path: ["data", "name"],
        message: "nama ga boleh kosong",
        code: "custom",
      });
    }

    const splittedContent = data.content
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ");

    if (!splittedContent.includes(data.data.name.toLowerCase())) {
      ctx.addIssue({
        code: "custom",
        path: ["data", "name"],
        message: `ga ada ${data.data.name} di teks kopi pasta`,
      });
    }
  });

export default function FormPasta({ id, name, email, avatar_url }: UserType) {
  const [tags] = useAtom(tagsAtom);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", content: "", data: { name: "" }, type: "dynamic", tags: [] },
  });

  const handleSubmit = (value: z.infer<typeof FormSchema>) => {
    if (value.type === "static") {
      value.data.name = "";
    }

    const splittedContent = value.content.split(" ");

    if (value.type === "dynamic") {
      for (let i = 0; i < splittedContent.length; i++) {
        const replace = splittedContent[i].replace(/[^\w\s]/g, "").toLowerCase();
        if (replace === value.data.name.toLowerCase()) {
          splittedContent[i] = "{{name}}" + splittedContent[i].toLowerCase().replace(`${replace}`, "");
        }
      }
    }

    console.log({ ...value, content: splittedContent.join(" "), user_id: id, user_meta_data: { name, email, avatar_url } });
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
                <Input {...field} />
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
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>tags</FormLabel>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <FormField
                    key={tag}
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem key={tag}>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tag)}
                            onCheckedChange={(checked) => {
                              return checked ? field.onChange([...field.value, tag]) : field.onChange(field.value?.filter((value) => value !== tag));
                            }}
                          >
                            {tag}
                          </Checkbox>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
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
