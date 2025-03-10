import React, { useState, useEffect} from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface Product {
    id?: string;
    name: string;
    price: number;
}

const DisplayData = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newPrice, setNewPrice] = useState<string>('');
    const [newProduct, setNewProduct] = useState<string>('');

    const updateProduct = async (productId, updatedData) => {
        const productDoc = doc(db, 'products', productId);
        await updateDoc(productDoc, updatedData);
    };

    const deleteProduct = async (productId) => {
        await deleteDoc(doc(db, 'products', productId))
    }

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
          <h2>Users List</h2>
          {products.map((product) => (
            <div
              key={product.id}
              style={{ border: '2px solid black', margin: '10px' }}
            >
              <div key={product.id}>
                <p>Product: {product.name}</p>
                <p>Price: {product.price}</p>
              </div>
              <input
                onChange={(e) => setNewProduct(e.target.value)}
                type="string"
                placeholder="Enter new product"
              />
              <button onClick={() => updateProduct(product.id, { name: newProduct })}>
                Update Product
              </button>
              <input
                onChange={(e) => setNewPrice(e.target.value)}
                type="number"
                placeholder="Enter new price: "
              />
              <button onClick={() => updateProduct(product.id, { age: newPrice })}>
                Update Price
              </button>
              <button style={{ backgroundColor: 'crimson'}} onClick={() => deleteProduct(product.id)}>Delete Product</button>
            </div>
          ))}
        </div>
    );
};

export default DisplayData;