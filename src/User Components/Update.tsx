import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface User {
    id?: string;
    name: string;
    age: number;
}

const DisplayUserData = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newAge, setNewAge] = useState<string>('');
    const [newName, setNewName] = useState<string>('');
  
    const updateUser = async (userId, updatedData) => {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, updatedData);
    };

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db,'users'));
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
            <h2>User List</h2>
            {users.map((user) => (
                <div key={user.id} style={{ border: '2px solid black', margin: '10px' }}>
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                    </div>
                    <input
                        onChange={(e) => setNewName(e.target.value)}
                        type='string'
                        placeholder='Enter new name: '
                    />
                    <button onClick={() => updateUser(user.id, { name: newName })}>Update Name</button>
                    <input 
                        type='number'
                        onChange={(e) => setNewAge(e.target.value)}
                        placeholder='Enter new age: '
                    />
                    <button onClick={() => updateUser(user.id, { age: newAge })}>Update Age</button>
                </div>
            ))}
        </div>

    );
};

export default DisplayUserData;