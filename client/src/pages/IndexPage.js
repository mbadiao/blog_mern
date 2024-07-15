import { useEffect, useState } from "react";
import Post from "../post";
import { posts } from "../routes/routes";

const IndexPage = () => {
  const [allposts, setPosts] = useState([]);
  useEffect(() => {
    fetch(posts).then((response) => {
      response.json().then((Posts) => {
        setPosts(Posts);
      });
    });
  }, []);

  return (
    <>
      {allposts.length > 0 ? (
        allposts.map((post) => <Post key={post._id} {...post} />)
      ) : (
        <div>no post yet</div>
      )}
    </>
  );
};

export default IndexPage;
