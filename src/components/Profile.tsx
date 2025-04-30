import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Profile = () => {
    const [userData, setUserData] = useState<any>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const docRef = doc(db, 'users', auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    setName(docSnap.data().name);
                }
            }
        };
        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        if (auth.currentUser) {
            const docRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(docRef, { name });
            alert('Profile updated');
        }
    };

    const handleDelete = async () => {
        if (auth.currentUser) {
            const uid = auth.currentUser.uid;
            await deleteDoc(doc(db, 'users', uid));
            await auth.currentUser.delete();
            alert('Account deleted');
        }
    };

    if (!userData) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>Profile</h2>
            <p>Email: {userData.email}</p>
            <label>
                Name:
                <input value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete} style={{ color: 'red' }}>Delete Account</button>
        </div>
    );
};
export default Profile;