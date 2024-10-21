import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User } from 'firebase/auth'; 
import { auth, db } from "../app/firebase/config"; 
import { doc, setDoc, getDoc  } from "firebase/firestore"; 


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
    const add_update_read_post = async () => {
      const post_id = "BNf5ykTTc3u6XnhrDFVMr"
      const collection_name = "post"
      await setDoc(doc(db, collection_name, post_id), {
        title: "Los dkfjnsldlnfs",
        main_photo: {
          url: "https://picsum.photos/200/300",
          alt_tag: "Random image"
        },
        meta_description: "gfdkjgifsdh"
      });

      const docRef = await getDoc(doc(db, collection_name, post_id))
      console.log(docRef.data())
    };
    add_update_read_post();
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
