import { useState } from "react";
import AddPost from "./AddPost"; 

const Manage = () => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  return (
    <div>
      <h1>Управління постами</h1>
      <div>
        <button onClick={() => setIsAddingPost(true)}>Новий пост</button>
        <button onClick={() => setIsAddingPost(false)}>Існуючі пости</button>
      </div>

      {isAddingPost ? (
        <AddPost /> 
      ) : (
        <div>
          <h2>Існуючі пости</h2>
        </div>
      )}
    </div>
  );
};

export default Manage;
