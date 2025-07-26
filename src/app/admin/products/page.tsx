'use client'
// import { currentUser } from "@clerk/nextjs/server";
import { fetchProducts } from "@/lib/fetchProducts";
import CreateProductForm from "@/components/CreateProductForm";

import { useEffect, useState } from "react";
import { updateProduct } from "@/lib/firestoreProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default  function  AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  // const user = await currentUser();


  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm(product);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.id) return;
    setIsSaving(true);
    await updateProduct(form.id, form);
    const updated = products.map((p) => (p.id === form.id ? form : p));
    setProducts(updated);
    setIsSaving(false);
    setEditingProduct(null);
  };

  if (loading) return <div className="p-4">Loading products...</div>;
  //  if (!user || user.emailAddresses[0].emailAddress !== "aliwajdan.it@gmail.com" || "mominabbasminhas5@gmail.com") {
  //   return <div>🚫 Access Denied</div>;
  // }


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold">Rs {product.price}</p>
            <div className="flex gap-2 mt-2 overflow-scroll no-scrollbar">
              {product.media?.map((item: any, i: number) =>
                item.type === "image" ? (
                  <img
                    key={i}
                    src={item.url}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : null
              )}
            </div>
            <Button
              className="mt-4"
              onClick={() => handleEdit(product)}
              variant="outline"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Admin Panel - Add Product</h1>
        <CreateProductForm />
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)} >
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" />
            <Textarea name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" />
            <Input name="price" value={form.price || ""} onChange={handleChange} placeholder="Price" />
            <Input name="originalPrice" value={form.originalPrice || ""} onChange={handleChange} placeholder="Original Price" />
            <Input name="category" value={form.category || ""} onChange={handleChange} placeholder="Category" />
            <Input
              name="media"
              value={form.media?.map((m: any) => m.url).join(",") || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  media: e.target.value.split(",").map((url) => ({ url, type: "image" })),
                })
              }
              placeholder="Media URLs (comma separated)"
            />
            <Input
              name="variants.colors"
              value={form.variants?.colors?.join(",") || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  variants: {
                    ...form.variants,
                    colors: e.target.value.split(","),
                  },
                })
              }
              placeholder="Colors (comma separated)"
            />
            <Input
              name="variants.sizes"
              value={form.variants?.sizes?.join(",") || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  variants: {
                    ...form.variants,
                    sizes: e.target.value.split(","),
                  },
                })
              }
              placeholder="Sizes (comma separated)"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
