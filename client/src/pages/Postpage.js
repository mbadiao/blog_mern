import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/UserContext";
import { onepost, deletePostRoute } from "../routes/routes";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    fetch(onepost + id)
      .then((response) => response.json())
      .then((data) => setPostInfo(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(deletePostRoute + id, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  if (!postInfo) return null;
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.user.username}</div>
      {userInfo && userInfo._id === postInfo.user._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit
          </Link>
          <button className="delete-btn" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete
          </button>
        </div>
      )}
      <div className="image">
        <img src={postInfo.image} alt={postInfo.title} />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
