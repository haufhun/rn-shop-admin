export type Product = {
  category: number;
  created_at: string;
  hero_image: string;
  id: number;
  imageurl: string[];
  maxquantity: number;
  price: number | null;
  slug: string;
  title: string;
};

export type CategoryWithProducts = {
  created_at: string;
  id: number;
  image_url: string;
  name: string;
  products: Product[];
  slug: string;
};

export type CategoriesWithProductsResponse = CategoryWithProducts[];
