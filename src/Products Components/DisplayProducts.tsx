import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
    id?: string;
    name: string;
    price: number;
}

const DisplayData = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const dataArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Product[];
            setProducts(dataArray);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Products List</h2>
            {products.map((product) => (
                <div key={product.id}>
                    <p>Product: {product.name}</p>
                    <p>Price: {product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayData;