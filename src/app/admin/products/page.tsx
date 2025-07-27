'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/fetchProducts';
import { updateProduct, deleteProduct } from '@/lib/firestoreProducts';
import CreateProductForm from '@/components/CreateProductForm';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      ...product,
      price: product.price?.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      media: product.media?.map((m: any) => m.url).join(',') || '',
      variants: {
        sizes: product.variants?.sizes?.join(',') || '',
        colors: product.variants?.colors?.join(',') || '',
      },
      category: product.category?.name || '',
      categorySlug: product.category?.slug || '',
      subcategory: product.subcategory?.name || '',
      subcategorySlug: product.subcategory?.slug || '',
    });
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editingProduct?.id) return;
    setIsSaving(true);

    const updatedProduct = {
      ...editingProduct,
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      media: form.media.split(',').map((url: string) => ({ type: 'image', url })),
      variants: {
        sizes: form.variants.sizes.split(',').map((s: string) => s.trim()),
        colors: form.variants.colors.split(',').map((c: string) => c.trim()),
      },
      category: {
        name: form.category,
        slug: form.categorySlug,
      },
      subcategory: {
        name: form.subcategory,
        slug: form.subcategorySlug,
      },
    };

    await updateProduct(editingProduct.id, updatedProduct);
    const updated = products.map((p) => (p.id === editingProduct.id ? { ...updatedProduct, id: p.id } : p));
    setProducts(updated);
    setIsSaving(false);
    setEditingProduct(null);
  };

  const handleDelete = async () => {
    if (!editingProduct?.id) return;
    await deleteProduct(editingProduct.id);
    setProducts(products.filter((p) => p.id !== editingProduct.id));
    setEditingProduct(null);
  };

  if (loading) return <div className="p-4">Loading products...</div>;

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
                item.type === 'image' ? (
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
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="w-[90%] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" />
            <Textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" />
            <Input name="price" value={form.price || ''} onChange={handleChange} placeholder="Price" />
            <Input name="originalPrice" value={form.originalPrice || ''} onChange={handleChange} placeholder="Original Price" />
            <Input name="category" value={form.category || ''} onChange={handleChange} placeholder="Category Name" />
            <Input name="categorySlug" value={form.categorySlug || ''} onChange={handleChange} placeholder="Category Slug" />
            <Input name="subcategory" value={form.subcategory || ''} onChange={handleChange} placeholder="Subcategory Name" />
            <Input name="subcategorySlug" value={form.subcategorySlug || ''} onChange={handleChange} placeholder="Subcategory Slug" />
            <Input name="media" value={form.media || ''} onChange={handleChange} placeholder="Media URLs (comma separated)" />
            <Input name="variants.colors" value={form.variants?.colors || ''} onChange={(e) => setForm({ ...form, variants: { ...form.variants, colors: e.target.value } })} placeholder="Colors (comma separated)" />
            <Input name="variants.sizes" value={form.variants?.sizes || ''} onChange={(e) => setForm({ ...form, variants: { ...form.variants, sizes: e.target.value } })} placeholder="Sizes (comma separated)" />
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDelete}>Delete Product</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
