import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout.js";
import IndexPage from "./pages/IndexPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/registerPage.js";
import CreatePost from "./pages/CreatePost.js";
import Postpage from "./pages/Postpage.js";
import EditPost from "./pages/EditePost.js";
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/create"} element={<CreatePost />} />
        <Route path={"/post/:id"} element={<Postpage />} />
        <Route path={"/edit/:id"} element={<EditPost />} />
      </Route>
    </Routes>
  );
}

export default App;
