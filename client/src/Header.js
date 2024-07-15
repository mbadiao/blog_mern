import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { userProfile, logout } from "./routes/routes";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(userProfile, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [setUserInfo]);

  const handleLogout = async () => {
    try {
      const response = await fetch(logout, {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        setUserInfo(null);
        navigate('/')
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  return (
    <header>
      <Link className="logo" to="/">
        Blogify
      </Link>
      <nav>
        {userInfo && userInfo._id ? (
          <>
            <Link className="createpost" to="/create">Create new post</Link>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
