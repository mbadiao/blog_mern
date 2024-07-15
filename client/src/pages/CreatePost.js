import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { post } from "../routes/routes";
import * as SDK from "node-appwrite";
import { UserContext } from "../context/UserContext";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const createNewPost = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    try {
      const image = files ? await handleImageUpload(files) : null;
      const formData = {
        title,
        summary,
        content,
        image,
      };
      const response = await fetch(post, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([...posts, newPost]);
        setLoading(false);
        setRedirect(true);
      } else {
        console.error("Failed to create post:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
        disabled={loading}
      />
      <input
        type="file"
        onChange={handleImageChange}
        required
        disabled={loading}
      />
      <Editor value={content} onChange={setContent} />
      <button disabled={loading}>
        {loading ? "Creating post..." : "Create post"}
      </button>
    </form>
  );
}
