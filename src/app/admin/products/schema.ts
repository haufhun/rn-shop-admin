import { z } from "zod";

export const createOrUpdateProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.string().min(1, { message: "price is required" }),
  max_quantity: z.string().min(1, { message: "max_quantity is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  hero_image: z
    .any()
    .refine((file) => file.length === 1, "hero_image is required"),
  images: z
    .any()
    .refine(
      (files: FileList | null) => files instanceof FileList && files.length > 0,
      { message: "At least one image is required" }
    )
    .transform((files: FileList | null) => (files ? Array.from(files) : [])),
  intent: z
    .enum(["create", "update"], {
      message: "Intent must be either create or update",
    })
    .optional(),
  slug: z.string().optional(),
});

export type CreateOrUpdateProductSchema = z.infer<
  typeof createOrUpdateProductSchema
>;

export const createProductSchemaServer = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.number().positive({ message: "price is required" }),
  max_quantity: z.number().positive({ message: "max_quantity is required" }),
  category: z.number().positive({ message: "Category is required" }),
  hero_image: z.string().url({ message: "Hero image is required" }),
  images: z.array(z.string().url({ message: "Images are required" })),
});

export type CreateProductSchemaServer = z.infer<
  typeof createProductSchemaServer
>;
