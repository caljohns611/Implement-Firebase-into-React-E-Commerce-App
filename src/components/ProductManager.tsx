import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
    useEffect(() => {
        fetchProducts();
    }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(productsData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const docRef = doc(db, 'products', editingId);
      await updateDoc(docRef, form);
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'products'), form);
    }
    setForm({ title: '', description: '', price: 0, category: '', image: '' });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingId(product.id!);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Product Manager</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <strong>{product.title}</strong> - ${product.price}
            <br />
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}