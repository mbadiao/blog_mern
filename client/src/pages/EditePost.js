import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import { onepost, updatepost } from "../routes/routes";
import * as SDK from "node-appwrite";
import { UserContext } from "../context/UserContext";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { posts, setPosts } = useContext(UserContext);

  // Initialize Appwrite Client
  const client = new SDK.Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID)
    .setKey(process.env.REACT_APP_APPWRITE_API_KEY);

  const handleImageChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleImageUpload = async (image) => {
    const storageClient = new SDK.Storage(client);

    try {
      const response = await storageClient.createFile(
        process.env.REACT_APP_APPWRITE_BUCKET_ID,
        SDK.ID.unique(),
        image
      );
      return response.$id;
    } catch (error) {
      console.log("Error uploading image:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetch(onepost + id)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  const updatePost = async (ev) => {
    ev.preventDefault();

    try {
      const image = files ? await handleImageUpload(files) : null;
      const formData = {
        title,
        summary,
        content,
        image,
      };

      const response = await fetch(updatepost + id, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => post._id === id ? updatedPost : post)); // Update context state
        setRedirect(true);
      } else {
        console.error("Failed to update post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
