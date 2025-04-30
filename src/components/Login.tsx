import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<any>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredentail = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentail.user);
            alert('Login successfully');
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        alert('Logged Out');
    };

    return (
        <div>
            {!user ? (
                <form onSubmit={handleLogin}>
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
                    <button type='submit'>Login</button>
                </form>
            ) : (
                <div>
                    <p>Hello, {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Login;