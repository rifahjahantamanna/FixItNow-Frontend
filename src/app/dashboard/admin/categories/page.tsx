"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, CreateCategoryInput } from "@/lib/validators/category.validator";
import { useAdminCategories, useCreateCategory } from "@/lib/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useAdminCategories();
  const { mutate, isPending } = useCreateCategory();

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (data: CreateCategoryInput) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Category created!");
        form.reset();
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to create category");
      },
    });
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Categories</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Gardening" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Adding..." : "Add"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Existing Categories</h2>
      {isLoading && <Skeleton className="h-32 w-full rounded-lg" />}
      {categories && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardContent className="pt-6">
                <p className="font-medium">{cat.name}</p>
                {cat.description && (
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}