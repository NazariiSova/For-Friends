import { useState } from "react";
import AddPost from "./AddPost";
import PostsList from "./PostsList";
import '../styles/global.scss';

const Manage = () => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold flex justify-center">Управління постами</h1>
      <div className="flex gap-[10%] font-bold justify-center mt-5">
        <button onClick={() => setIsAddingPost(true)}>Новий пост</button>
        <button onClick={() => setIsAddingPost(false)}>Існуючі пости</button>
      </div>
      {isAddingPost ? <AddPost /> : <PostsList />}
    </div>
  );
};

export default Manage;
