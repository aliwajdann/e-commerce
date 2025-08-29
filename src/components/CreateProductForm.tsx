'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { serverTimestamp } from "firebase/firestore";

export default function CreateProductForm() {
  const [formData, setFormData] = useState<any>({
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
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = (path: string, value: any) => {
    const parts = path.split('.');
    setFormData((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
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
    setFormData((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur: any = copy;
      for (let i = 0; i < parts.length; i++) cur = cur[parts[i]];
      cur.push(defaultValue);
      return copy;
    });
  };

  const removeField = (path: string, index: number) => {
    setFormData((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur: any = copy;
      for (let i = 0; i < parts.length; i++) cur = cur[parts[i]];
      cur.splice(index, 1);
      return copy;
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t: string) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      title: formData.title,
      productCode: formData.productCode || null,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      media: (formData.media || []).filter(Boolean).map((url: string) => ({ type: 'image', url })),
      category: {
        name: formData.category.name.trim(),
        slug: formData.category.slug.trim(),
      },
      subcategory: {
        name: formData.subcategory.name.trim(),
        slug: formData.subcategory.slug.trim(),
      },
      variants: {
        sizes: (formData.variants?.sizes || []).filter((s: string) => s && s.trim() !== ''),
        colors: (formData.variants?.colors || []).map((c: any) => ({
          colorCode: c.colorCode,
          colorName: c.colorName,
          image: c.image || '',
        })),
      },
      features: (formData.features || []).filter((f: string) => f && f.trim() !== ''),
      tags: formData.tags || [], // 👈 include tags
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'products'), productData);
      alert('Product added!');
      setFormData({
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
        tags: [], // reset tags
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    
   


    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
        <input value={formData.title} onChange={(e) => handleChange('title', e.target.value)} className="border p-2 w-full" placeholder="Title" required />
      <input value={formData.productCode} onChange={(e) => handleChange('productCode', e.target.value)} className="border p-2 w-full" placeholder="Product Code / SKU (optional)" />
      <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="border p-2 w-full" placeholder="Description" required />

      <div className="grid grid-cols-2 gap-2">
        <input value={formData.price} onChange={(e) => handleChange('price', e.target.value)} type="number" className="border p-2" placeholder="Price" required />
        <input value={formData.originalPrice} onChange={(e) => handleChange('originalPrice', e.target.value)} type="number" className="border p-2" placeholder="Original Price (optional)" />
      </div>

      {/* category */}
      <div className="grid grid-cols-2 gap-2">
        <input value={formData.category.name} onChange={(e) => handleChange('category.name', e.target.value)} className="border p-2" placeholder="Category Name" />
        <input value={formData.category.slug} onChange={(e) => handleChange('category.slug', e.target.value)} className="border p-2" placeholder="Category Slug" />
      </div>

    <div className="grid grid-cols-2 gap-2">
  <input
    value={formData.subcategory.name}
    onChange={(e) => handleChange('subcategory.name', e.target.value)}
    className="border p-2"
    placeholder="Subcategory Name"
  />
  <input
    value={formData.subcategory.slug}
    onChange={(e) => handleChange('subcategory.slug', e.target.value)}
    className="border p-2"
    placeholder="Subcategory Slug"
  />
</div>

   
      {/* media */}
      <div>
        <p className="text-sm font-medium mb-2">Media (image URLs)</p>
        {formData.media.map((m: string, i: number) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input value={m} onChange={(e) => handleChange(`media.${i}`, e.target.value)} className="border p-2 flex-1" placeholder={`Image ${i+1} URL`} />
            <button type="button" className="text-red-500" onClick={() => removeField('media', i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="text-blue-500" onClick={() => addField('media', '')}>+ Add image</button>
      </div>

      {/* sizes */}
      <div>
        <p className="text-sm font-medium mb-2">Sizes</p>
        {formData.variants.sizes.map((s: string, i: number) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input value={s} onChange={(e) => handleChange(`variants.sizes.${i}`, e.target.value)} className="border p-2 flex-1" placeholder={`Size ${i+1}`} />
            <button type="button" className="text-red-500" onClick={() => removeField('variants.sizes', i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="text-blue-500" onClick={() => addField('variants.sizes', '')}>+ Add Size</button>
      </div>

      {/* colors */}
      <div>
        <p className="text-sm font-medium mb-2">Colors</p>
        {formData.variants.colors.map((c: any, i: number) => (
          <div key={i} className="grid grid-cols-6 gap-2 items-center mb-2">
            <div className="col-span-1">
              <div className="w-8 h-8 rounded border" style={{ background: c.colorCode }} />
            </div>
            <input className="col-span-2 border p-2" value={c.colorCode} onChange={(e) => handleChange(`variants.colors.${i}.colorCode`, e.target.value)} placeholder="#000000" />
            <input className="col-span-2 border p-2" value={c.colorName} onChange={(e) => handleChange(`variants.colors.${i}.colorName`, e.target.value)} placeholder="Color name" />
            <button className="text-red-500" type="button" onClick={() => removeField('variants.colors', i)}>Remove</button>

            <input className="col-span-6 border p-2 mt-1" value={c.image} onChange={(e) => handleChange(`variants.colors.${i}.image`, e.target.value)} placeholder="Swatch image URL (optional)" />
          </div>
        ))}
        <button type="button" className="text-blue-500" onClick={() => addField('variants.colors', { colorCode: '#000000', colorName: '', image: '' })}>+ Add color</button>
      </div>

      {/* features */}
      <div>
        <p className="text-sm font-medium mb-2">Features</p>
        {formData.features.map((f: string, i: number) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input className="flex-1 border p-2" value={f} onChange={(e) => handleChange(`features.${i}`, e.target.value)} placeholder="e.g. 100% cotton" />
            <button type="button" className="text-red-500" onClick={() => removeField('features', i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="text-blue-500" onClick={() => addField('features', '')}>+ Add feature</button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>

      {/* tags */}
      <div>
        <p className="text-sm font-medium mb-2">Tags</p>
        <div className="flex flex-wrap gap-2 border p-2 rounded">
          {formData.tags.map((tag: string, i: number) => (
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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}
