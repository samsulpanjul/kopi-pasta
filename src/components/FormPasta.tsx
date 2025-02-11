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
import { Checkbox } from "./ui/checkbox-button";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    title: z.string().trim().nonempty({ message: "judul ga boleh kosong" }),
    content: z.string().trim().nonempty({ message: "teks ga boleh kosong" }),
    variables: z.object({
      name: z.string().trim(),
    }),
    type: z.enum(["static", "dynamic"]),
    tags: z.string().array().nonempty({ message: "pilih salah satu tag" }),
  })
  .superRefine((data, ctx) => {
    if (data.title.trim().split(" ").length > 15) {
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "ga boleh lebih dari 15 kata",
      });
    }

    if (data.type === "dynamic" && !data.variables.name.length) {
      ctx.addIssue({
        path: ["variables", "name"],
        message: "nama ga boleh kosong",
        code: "custom",
      });
    }

    if (data.type === "dynamic" && !new RegExp(`\\b${data.variables.name}\\b`, "i").test(data.content.replace(/[^\w\s]/g, ""))) {
      ctx.addIssue({
        code: "custom",
        path: ["variables", "name"],
        message: `ga ada ${data.variables.name} di teks kopi pasta`,
      });
    }
  });

export default function FormPasta() {
  const [tags] = useAtom(tagsAtom);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", content: "", variables: { name: "" }, type: "dynamic", tags: [] },
  });

  const handleSubmit = async (value: z.infer<typeof FormSchema>) => {
    if (value.type === "static") {
      value.variables.name = "";
    }

    if (value.type === "dynamic") {
      value.content = value.content.replaceAll(value.variables.name, "{{name}}");
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pasta`, {
        ...value,
      });
      form.reset();
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        console.error("Unknown Error:", error);
      }
    }
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
                <Textarea
                  {...field}
                  className="h-[200px] scrollbar"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("type") === "dynamic" && (
          <FormField
            control={form.control}
            name="variables.name"
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
          disabled={form.formState.isSubmitting}
        >
          post
        </Button>
      </form>
    </Form>
  );
}
