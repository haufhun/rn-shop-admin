"use client";

import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CategoryTableRow } from "@/components/category";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "@/app/admin/categories/create-category.schema";
import { CategoriesWithProductsResponse } from "@/app/admin/categories/categories.types";
import { CategoryForm } from "@/app/admin/categories/category-form";
import {
  createCategory,
  deleteCategory,
  imageUploadHandler,
  updateCategory,
} from "@/actions/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  categories: CategoriesWithProductsResponse;
};

const CategoryPageComponent = ({ categories }: Props) => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<CreateCategorySchema | null>(null);

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const submitCategoryHandler = async (data: CreateCategorySchema) => {
    console.log(data);
    // try {
    //   if (currentCategory) {
    //     await updateCategory(currentCategory.id, data);
    //     toast.success("Category updated successfully");
    //   } else {
    //     await createCategory(data);
    //     toast.success("Category created successfully");
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center my-10">
        <div className="ml-auto flex items-center gap-2">
          <Dialog
            open={isCreateCategoryModalOpen}
            onOpenChange={() =>
              setIsCreateCategoryModalOpen(!isCreateCategoryModalOpen)
            }
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  setCurrentCategory(null);
                  setIsCreateCategoryModalOpen(true);
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
                <CategoryForm
                  form={form}
                  onSubmit={submitCategoryHandler}
                  defaultValues={currentCategory}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default CategoryPageComponent;
