// components/CreateProductForm.tsx

'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    originalPrice: '',
    media: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'media' && typeof index === 'number') {
      const updatedMedia = [...formData.media];
      updatedMedia[index] = value;
      setFormData({ ...formData, media: updatedMedia });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddMedia = () => {
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, ''],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      media: formData.media.map((url) => ({ type: 'image', url })),
    };

    try {
      await addDoc(collection(db, 'products'), productData);
      alert('Product added!');
      setFormData({
        title: '',
        category: '',
        description: '',
        price: '',
        originalPrice: '',
        media: [''],
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 w-full" required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 w-full" required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full" required />
      <input name="originalPrice" type="number" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} className="border p-2 w-full" required />

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
        <button type="button" onClick={handleAddMedia} className="text-blue-500 text-sm mt-1">
          + Add more images
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}
