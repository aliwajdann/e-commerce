'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/fetchProducts';
import { updateProduct, deleteProduct } from '@/lib/firestoreProducts';
import CreateProductForm from '@/components/CreateProductForm';
import { serverTimestamp } from "firebase/firestore";

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
  const [form, setForm] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const emptyForm = {
    title: '',
    description: '',
    productCode: '',
    price: '',
    originalPrice: '',
    media: [''],
    category: { name: '', slug: '' },
    subcategory: { name: '', slug: '' },
    variants: {
      sizes: [''],
      colors: [{ colorCode: '#000000', colorName: '', image: '' }],
    },
    features: [''],
    tags: [], // 👈 NEW
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      title: product.title || '',
      description: product.description || '',
      productCode: product.productCode || '',
      price: product.price?.toString() || '',
      originalPrice: product.originalPrice?.toString() || '',
      media: (product.media || []).map((m: any) => m.url) || [''],
      category: product.category || { name: '', slug: '' },
      subcategory: product.subcategory || { name: '', slug: '' },
      variants: {
        sizes: product.variants?.sizes?.slice() || [''],
        colors:
          (product.variants?.colors?.map((c: any) => ({
            colorCode: c.colorCode || '#000000',
            colorName: c.colorName || '',
            image: c.image || '',
          })) || [{ colorCode: '#000000', colorName: '', image: '' }]),
      },
      features: product.features?.slice() || [''],
      tags: product.tags?.slice() || [], // 👈 load existing tags
      updatedAt: serverTimestamp(),
    });
  };

  const handleChange = (path: string, value: any) => {
    const parts = path.split('.');
    setForm((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev || emptyForm));
      let cur: any = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!(p in cur)) cur[p] = {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const addField = (path: string, defaultValue: any) => {
    setForm((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev || emptyForm));
      const parts = path.split('.');
      let cur: any = copy;
      for (let i = 0; i < parts.length; i++) {
        cur = cur[parts[i]];
      }
      cur.push(defaultValue);
      return copy;
    });
  };

  const removeField = (path: string, index: number) => {
    setForm((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev || emptyForm));
      const parts = path.split('.');
      let cur: any = copy;
      for (let i = 0; i < parts.length; i++) {
        cur = cur[parts[i]];
      }
      cur.splice(index, 1);
      return copy;
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!form.tags.includes(tagInput.trim())) {
        setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t: string) => t !== tag) });
  };

  const handleSave = async () => {
    if (!editingProduct?.id || !form) return;
    setIsSaving(true);
    try {
      const updatedProduct = {
        ...editingProduct,
        title: form.title,
        description: form.description,
        productCode: form.productCode || null,
        price: parseFloat(form.price) || 0,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        media: (form.media || []).filter(Boolean).map((url: string) => ({ type: 'image', url })),
        variants: {
          sizes: (form.variants?.sizes || []).filter((s: string) => s && s.trim() !== '').map((s: string) => s.trim()),
          colors: (form.variants?.colors || []).map((c: any) => ({
            colorCode: c.colorCode,
            colorName: c.colorName,
            image: c.image || '',
          })),
        },
        category: {
          name: form.category?.name || '',
          slug: form.category?.slug || '',
        },
        subcategory: {
          name: form.subcategory?.name || '',
          slug: form.subcategory?.slug || '',
        },
        features: (form.features || []).filter((f: string) => f && f.trim() !== '').map((f: string) => f.trim()),
        tags: form.tags || [], // 👈 include tags
      };

      await updateProduct(editingProduct.id, updatedProduct);
      const updated = products.map((p) => (p.id === editingProduct.id ? { ...updatedProduct, id: p.id } : p));
      setProducts(updated);
      setEditingProduct(null);
      setForm(null);
    } catch (err) {
      console.error('update error', err);
      alert('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingProduct?.id) return;
    await deleteProduct(editingProduct.id);
    setProducts(products.filter((p) => p.id !== editingProduct.id));
    setEditingProduct(null);
    setForm(null);
  };

  if (loading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold">£{product.price}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags?.map((tag: string, i: number) => (
                <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-2 overflow-scroll no-scrollbar">
              {product.media?.map((item: any, i: number) =>
                item.type === 'image' ? (
                  <img key={i} src={item.url} alt="" className="w-16 h-16 object-cover rounded" />
                ) : null
              )}
            </div>
            <Button className="mt-4" onClick={() => handleEdit(product)} variant="outline">
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
      <Dialog open={!!editingProduct} onOpenChange={() => { setEditingProduct(null); setForm(null); }}>
        <DialogContent className="w-[90%] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {/* Form */}
          <div className="grid gap-4 py-4">



            {/* top-level fields */}
            <Input value={form?.title || ''} placeholder="Title" onChange={(e: any) => handleChange('title', e.target.value)} />
            <Input value={form?.productCode || ''} placeholder="Product code (SKU)" onChange={(e: any) => handleChange('productCode', e.target.value)} />
            <Textarea value={form?.description || ''} placeholder="Description" onChange={(e: any) => handleChange('description', e.target.value)} />

            <div className="grid grid-cols-2 gap-2">
              <Input value={form?.price || ''} placeholder="Price" onChange={(e: any) => handleChange('price', e.target.value)} />
              <Input value={form?.originalPrice || ''} placeholder="Original Price" onChange={(e: any) => handleChange('originalPrice', e.target.value)} />
            </div>

            {/* category */}
            <div className="grid grid-cols-2 gap-2">
              <Input value={form?.category?.name || ''} placeholder="Category Name" onChange={(e: any) => handleChange('category.name', e.target.value)} />
              <Input value={form?.category?.slug || ''} placeholder="Category Slug" onChange={(e: any) => handleChange('category.slug', e.target.value)} />
            </div>

            {/* subcategory */}
            <div className="grid grid-cols-2 gap-2">
              <Input value={form?.subcategory?.name || ''} placeholder="Subcategory Name" onChange={(e: any) => handleChange('subcategory.name', e.target.value)} />
              <Input value={form?.subcategory?.slug || ''} placeholder="Subcategory Slug" onChange={(e: any) => handleChange('subcategory.slug', e.target.value)} />
            </div>

            {/* media list */}
            <div>
              <p className="text-sm font-medium mb-2">Media (image URLs)</p>
              {form?.media?.map((url: string, i: number) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <input value={url} className="border p-2 flex-1" onChange={(e) => handleChange(`media.${i}`, e.target.value)} />
                  <button type="button" className="text-sm text-red-500" onClick={() => removeField('media', i)}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-500 text-sm" onClick={() => addField('media', '')}>+ Add image</button>
            </div>

            {/* sizes */}
            <div>
              <p className="text-sm font-medium mb-2">Sizes</p>
              {form?.variants?.sizes?.map((size: string, i: number) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <input value={size} className="border p-2 flex-1" onChange={(e) => handleChange(`variants.sizes.${i}`, e.target.value)} />
                  <button type="button" className="text-sm text-red-500" onClick={() => removeField('variants.sizes', i)}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-500 text-sm" onClick={() => addField('variants.sizes', '')}>+ Add size</button>
            </div>

            {/* colors (nice UI with swatch preview) */}
            <div>
              <p className="text-sm font-medium mb-2">Colors</p>
              {form?.variants?.colors?.map((color: any, i: number) => (
                <div key={i} className="grid grid-cols-6 gap-2 items-center mb-2">
                  <div className="col-span-1">
                    <div className="w-8 h-8 rounded border" style={{ background: color.colorCode || '#000' }} />
                  </div>
                  <input className="col-span-2 border p-2" value={color.colorCode} onChange={(e) => handleChange(`variants.colors.${i}.colorCode`, e.target.value)} />
                  <input className="col-span-2 border p-2" value={color.colorName} onChange={(e) => handleChange(`variants.colors.${i}.colorName`, e.target.value)} />
                  <button className="text-sm text-red-500" onClick={() => removeField('variants.colors', i)}>Remove</button>

                  <input className="col-span-6 border p-2 mt-1" placeholder="Swatch Image URL (optional)" value={color.image} onChange={(e) => handleChange(`variants.colors.${i}.image`, e.target.value)} />
                </div>
              ))}
              <button type="button" className="text-blue-500 text-sm" onClick={() => addField('variants.colors', { colorCode: '#000000', colorName: '', image: '' })}>+ Add color</button>
            </div>

             <div>
              <p className="text-sm font-medium mb-2">Tags</p>
              <div className="flex flex-wrap gap-2 border p-2 rounded">
                {form?.tags?.map((tag: string, i: number) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
                    {tag}
                    <button type="button" className="text-red-500" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tag & press Enter"
                  className="flex-1 outline-none"
                />
              </div>
            </div>

           
            {/* features (array of strings) */}
            <div>
              <p className="text-sm font-medium mb-2">Features (highlight bullets)</p>
              <div className="flex flex-col gap-2">
                {form?.features?.map((feat: string, i: number) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input className="flex-1 border p-2" value={feat} onChange={(e) => handleChange(`features.${i}`, e.target.value)} />
                    <button className="text-red-500 text-sm" onClick={() => removeField('features', i)}>Remove</button>
                  </div>
                ))}
              </div>
              <button type="button" className="text-blue-500 text-sm mt-1" onClick={() => addField('features', '')}>+ Add feature</button>
            </div>

          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDelete}>Delete Product</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setEditingProduct(null); setForm(null); }}>Cancel</Button>
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