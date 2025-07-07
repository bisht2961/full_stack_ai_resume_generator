import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "@/components/ui/sonner"
import "aos/dist/aos.css";


function App() {
  

  const user_email = localStorage.getItem("email");

  if (!user_email) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
