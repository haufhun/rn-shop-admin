"use server";

import slugify from "slugify";

import { createClient } from "@/supabase/server";
import {
  ProductsWithCategoryResponse,
  UpdateProductSchema,
} from "@/app/admin/products/products.types";
import { CreateProductSchemaServer } from "@/app/admin/products/schema";

const supabase = await createClient();

export const getProductsWithCategory =
  async (): Promise<ProductsWithCategoryResponse> => {
    const { data, error } = await supabase
      .from("product")
      .select("*, category:categories(*)")
      .returns<ProductsWithCategoryResponse>()
      .order("id", { ascending: false });

    if (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }

    return data || [];
  };

export const createProduct = async ({
  category,
  heroImage,
  images,
  maxQuantity,
  price,
  title,
}: CreateProductSchemaServer) => {
  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from("product").insert({
    category,
    hero_image: heroImage,
    images_url: images,
    max_quantity: maxQuantity,
    price,
    slug,
    title,
  });

  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }

  return data;
};

export const updateProduct = async ({
  category,
  heroImage,
  imagesUrl,
  maxQuantity,
  price,
  slug,
  title,
}: UpdateProductSchema) => {
  const { data, error } = await supabase
    .from("product")
    .update({
      category,
      heroImage,
      imagesUrl,
      maxQuantity,
      price,
      title,
    })
    .match({ slug });

  if (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }

  return data;
};

export const deleteProduct = async (slug: string) => {
  const { error } = await supabase.from("product").delete().match({ slug });

  if (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};
