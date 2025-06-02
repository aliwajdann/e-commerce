import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";


export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = params.id;

  if (!category) {
    throw new Error("Category slug is missing!");
  }

  const q = query(collection(db, "products"), where("category", "==", category));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-6">{category}</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.price,
                originalprice: product.originalPrice,
                images: product.media,
                rating: 4.5,
                colors: ["#000000", "#e53e3e", "#4299e1"],
                isNew: true,
                isBestSeller: true,
                href: `/products/${product.id}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
