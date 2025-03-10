import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface Product {
    id?: string;
    productName: string;
    price: number;
}

const DisplayProductData = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<string>('');
    const [newPrice, setNewPrice] = useState<string>('');

    const updateProduct = async (productId, updatedData) => {
        const productDoc = doc(db, 'products', productId);
        await updateDoc(productDoc, updatedData);
    };

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
            <h2>Product List</h2>
            {products.map((product) => (
                <div key={product.id} style={{ border: '2px solid black', margin: '10px' }}>
                    <div key={product.id}>
                        <p>Product: {product.productName}</p>
                        <p>Price: {product.price}</p>
                    </div>
                    <input
                        onChange={(e) => setNewProduct(e.target.value)}
                        type='string'
                        placeholder='Enter a new product: '
                    />
                    <button onClick={() => updateProduct(product.id, { product: newProduct })}>Update Product</button>
                    <input
                        type='number'
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder='Enter new price: '
                    />
                    <button onClick={() => updateProduct(product.id, { price: newPrice })}>Update Price</button>
                </div>
            ))}
        </div>
    );
};

export default DisplayProductData;