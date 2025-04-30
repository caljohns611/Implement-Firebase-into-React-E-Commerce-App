import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const userCredentail = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentail.user;

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                name,
                createAt: new Date().toISOString()
            });

            alert('Registration successfull');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register;