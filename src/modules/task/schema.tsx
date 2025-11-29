import * as z from "zod";

export const TaskSchema = z.object({
  id: z.number("ID has to be number").positive("ID has to be positive"),
  title: z
    .string("Title is required")
    .min(3, "Too short min 3 characters")
    .max(100, "Too long max 100 characters"),
  isDone: z.boolean("isDone is required"),
});

export const TasksSchema = TaskSchema.array();

export type Task = z.infer<typeof TaskSchema>;
export type Tasks = z.infer<typeof TasksSchema>;
/// TODO: add description
