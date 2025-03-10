import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface User {
    id?: string;
    name: string;
    age: number;
}

const DisplayData = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const dataArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];
            setUsers(dataArray);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            {users.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayData;