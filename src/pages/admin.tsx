import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User } from 'firebase/auth'; 
import { auth } from "../app/firebase/config"; 

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); 
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  if (user) {
    return <div>Welcome to the admin page!</div>;
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
