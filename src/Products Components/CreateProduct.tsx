import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Product {
    id?: string;
    product: string;
    price: number;
}

const AddProductForm = () => {
    const[data, setData] = useState<Omit<Product, 'id'>>({ product: '', price: 0 });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: name === 'price' ? parseInt(value) : value });
    };

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'users'), data);
            alert('Data added');
            setData({ product: '', price: 0 });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name='product'
                value={data.product}
                onChange={handleChange}
                placeholder='Product'
            />
            <input
                name='price'
                type='number'
                value={data.price}
                onChange={handleChange}
                placeholder='Price'
            />
            <button type='submit'>Add product</button>
        </form>
    );
};

export default AddProductForm;