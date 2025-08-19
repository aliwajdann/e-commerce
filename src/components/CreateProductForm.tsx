'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    media: [''],
    category: { name: '', slug: '' },
    subcategory: { name: '', slug: '' },
    variants: {
      sizes: [''],
      colors: [{ colorCode: '', colorName: '', image: '' }],
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, variantType?: 'sizes' | 'colors') => {
    const { name, value } = e.target;

    if (name === 'media' && typeof index === 'number') {
      const updatedMedia = [...formData.media];
      updatedMedia[index] = value;
      setFormData({ ...formData, media: updatedMedia });
    } else if (variantType === 'sizes' && typeof index === 'number') {
      const updatedSizes = [...formData.variants.sizes];
      updatedSizes[index] = value;
      setFormData({ ...formData, variants: { ...formData.variants, sizes: updatedSizes } });
    } else if (variantType === 'colors' && typeof index === 'number') {
      const { field } = e.target.dataset;
      const updatedColors = [...formData.variants.colors];
      updatedColors[index] = { ...updatedColors[index], [field!]: value };
      setFormData({ ...formData, variants: { ...formData.variants, colors: updatedColors } });
    } else if (name.startsWith('category.') || name.startsWith('subcategory.')) {
      const [parent, key] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as 'category' | 'subcategory'],
          [key]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (field: 'media' | 'sizes' | 'colors') => {
    if (field === 'media') {
      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, ''],
      }));
    } else if (field === 'sizes') {
      setFormData((prev) => ({
        ...prev,
        variants: { ...prev.variants, sizes: [...prev.variants.sizes, ''] },
      }));
    } else if (field === 'colors') {
      setFormData((prev) => ({
        ...prev,
        variants: {
          ...prev.variants,
          colors: [...prev.variants.colors, { colorCode: '', colorName: '', image: '' }],
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      media: formData.media.map((url) => ({ type: 'image', url })),
      category: {
        name: formData.category.name.trim(),
        slug: formData.category.slug.trim(),
      },
      subcategory: {
        name: formData.subcategory.name.trim(),
        slug: formData.subcategory.slug.trim(),
      },
      variants: {
        sizes: formData.variants.sizes.filter((s) => s.trim() !== ''),
        colors: formData.variants.colors.filter((c) => c.colorCode && c.colorName),
      },
    };

    try {
      await addDoc(collection(db, 'products'), productData);
      alert('Product added!');
      setFormData({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        media: [''],
        category: { name: '', slug: '' },
        subcategory: { name: '', slug: '' },
        variants: {
          sizes: [''],
          colors: [{ colorCode: '', colorName: '', image: '' }],
        },
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 w-full" required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full" required />
      <input name="originalPrice" type="number" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} className="border p-2 w-full" required />

      {/* Category */}
      <div className="space-y-1">
        <input name="category.name" placeholder="Category Name" value={formData.category.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="category.slug" placeholder="Category Slug" value={formData.category.slug} onChange={handleChange} className="border p-2 w-full" />
      </div>

      {/* Subcategory */}
      <div className="space-y-1">
        <input name="subcategory.name" placeholder="Subcategory Name" value={formData.subcategory.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="subcategory.slug" placeholder="Subcategory Slug" value={formData.subcategory.slug} onChange={handleChange} className="border p-2 w-full" />
      </div>

      {/* Media */}
      <div>
        {formData.media.map((url, i) => (
          <input
            key={i}
            name="media"
            placeholder={`Image URL ${i + 1}`}
            value={url}
            onChange={(e) => handleChange(e, i)}
            className="border p-2 w-full mt-1"
            required
          />
        ))}
        <button type="button" onClick={() => handleAddField('media')} className="text-blue-500 text-sm mt-1">
          + Add more images
        </button>
      </div>

      {/* Sizes */}
      <div>
        {formData.variants.sizes.map((size, i) => (
          <input
            key={i}
            placeholder={`Size ${i + 1}`}
            value={size}
            onChange={(e) => handleChange(e, i, 'sizes')}
            className="border p-2 w-full mt-1"
          />
        ))}
        <button type="button" onClick={() => handleAddField('sizes')} className="text-blue-500 text-sm mt-1">
          + Add Size
        </button>
      </div>

      {/* Colors */}
      <div>
        {formData.variants.colors.map((color, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mt-1">
            <input
              placeholder="Color Code (#000000)"
              value={color.colorCode}
              data-field="colorCode"
              onChange={(e) => handleChange(e, i, 'colors')}
              className="border p-2 w-full"
            />
            <input
              placeholder="Color Name"
              value={color.colorName}
              data-field="colorName"
              onChange={(e) => handleChange(e, i, 'colors')}
              className="border p-2 w-full"
            />
            <input
              placeholder="Swatch Image URL"
              value={color.image}
              data-field="image"
              onChange={(e) => handleChange(e, i, 'colors')}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('colors')} className="text-blue-500 text-sm mt-1">
          + Add Color
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}
