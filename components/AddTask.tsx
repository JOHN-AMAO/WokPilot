"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarRange, Plus } from "lucide-react";
import { MultiSelect } from "@/components/multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createTask } from "@/lib/tasks";
import axios from "axios";

const CollaboratorsList = [
  { value: "Alice", label: "Alice", icon: Turtle },
  { value: "Bob", label: "Bob", icon: Cat },
  { value: "Charlie", label: "Charlie", icon: Dog },
  { value: "Dave", label: "Dave", icon: Rabbit },
  { value: "Eve", label: "Eve", icon: Fish },
];

const formSchema = z.object({
  description: z.string().min(2).max(50),
  duration: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  collaborators: z.array(z.string()),
  projectId: z.string(),
  profileId: z.string(),
});

const AddTask = ({ projectId, profileId }: any) => {
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([
    "Alice",
    "Bob",
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      duration: {
        from: undefined,
        to: undefined,
      },
      collaborators: selectedCollaborators,
      projectId: projectId,
      profileId: profileId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.collaborators = selectedCollaborators; // Ensure selectedCollaborators are included in form values
    console.log(values);
    try {
      //   const task = await createTask(values);
      //   console.log("Task created successfully:", task);
      axios.post("/api/tasks", values);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className='bg-gradient-to-r p-2 rounded-lg from-violet-600 to-indigo-600 flex'>
            <Plus />
            <span>Add Task</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Task</DialogTitle>
            <DialogDescription>
              Create task description, assign teammates to work on the task, and
              select a time range.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Carry out customer research'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a detailed task description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='p-2 max-w-lg'>
                <h1 className='text-xl font-bold mb-4'>Assign Collaborators</h1>
                <MultiSelect
                  options={CollaboratorsList}
                  onValueChange={(newValues) => {
                    setSelectedCollaborators(newValues);
                    form.setValue("collaborators", newValues); // Update the form value for collaborators
                  }}
                  defaultValue={selectedCollaborators}
                  placeholder='Select Collaborators'
                  variant='inverted'
                  animation={2}
                  maxCount={3}
                />
                <FormField
                  control={form.control}
                  name='duration'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Start and End Date</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            id='date'
                            variant='outline'
                            className={cn(
                              "w-full bg-blue-900 justify-start text-left font-normal",
                              !field.value?.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarRange className='mr-2 h-4 w-4' />
                            {field.value?.from ? (
                              field.value?.to ? (
                                <>
                                  {format(field.value.from, "PPP")} -{" "}
                                  {format(field.value.to, "PPP")}
                                </>
                              ) : (
                                format(field.value.from, "PPP")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className='w-auto p-0 overflow-auto'
                          align='center'
                        >
                          <Calendar
                            initialFocus
                            mode='range'
                            defaultMonth={field.value?.from}
                            selected={{
                              from: field.value?.from,
                              to: field.value?.to,
                            }}
                            disabled={(date) => date < yesterday}
                            onSelect={field.onChange}
                            numberOfMonths={1}
                            className='flex flex-row'
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className='mt-2'>
                        Select the start and end date.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
