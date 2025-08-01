import React from "react";
import { Button } from "../ui/button";
import { Link,useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
 
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("email");
    const tokens = sessionStorage.getItem("access_token");
    const refresh_token = sessionStorage.getItem("refresh_token");
    setIsSignedIn(!!user && !!tokens && !!refresh_token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("email");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    setIsSignedIn(false);
    navigate("/auth/sign-in");
  };

  return (
    <div className="p-3 px-5 flex justify-between shadow-md items-center">
      <Link to="/">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-10 w-10 object-cover rounded-full hover:scale-105 transition-transform"
        />
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
           <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
