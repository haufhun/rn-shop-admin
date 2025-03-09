import { getCategoriesWithProducts } from "@/actions/categories";

export default async function CategoriesPage() {
  const categories = await getCategoriesWithProducts();

  return <>Category</>;
}
