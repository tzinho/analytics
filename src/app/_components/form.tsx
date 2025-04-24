"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DatePickerWithRange } from "~/components/date-picker-range";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

const schema = z.object({
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type Schema = z.infer<typeof schema>;

export const AnalyticsSalesForm = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form className="flex gap-3">
        <DatePickerWithRange name="dates" />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};
