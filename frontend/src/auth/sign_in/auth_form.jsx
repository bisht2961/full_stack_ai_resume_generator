import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.svg"; // Adjust the path as necessary
import { useResumeApi } from "../../hooks/useResumeApi";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const {
    registerUser,
    loginUser,
  } = useResumeApi();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    try{
      if(!isLogin){
       
        const response = await registerUser(form);
       
        if (response && response.data) {
          toast.success("Registration successful! Login to continue.");
          setForm({ email: "", password: "" }); // Reset form on success
          setIsLogin(true);

        }else {
          toast.error("Registration failed. Please try again.");
          setForm({ password: "" }); // Reset form on error password
        }
      }else{
        console.log("Logging in user:", form);
        const response = await loginUser(form);
        if (response.data) {
          
          const { access_token,refresh_token, email } = response.data;
          sessionStorage.setItem("access_token", access_token);
          sessionStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("email", email);
          toast.success("Login successful!");
          navigate("/dashboard");

        }else {
          toast.error("Login failed. Please check your credentials.");
          setForm({ password: "" }); // Reset form on error
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md w-[400px] h-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center mb-4">
        <Link to="/">
          <div className="p-2 rounded-xl bg-white shadow-lg transition-transform duration-500 hover:scale-105">
            <img
              src={logo}
              alt="App Logo"
              className="h-14 w-14 object-contain"
            />
          </div>
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <label className="block mb-2 text-sm">Email</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
        required
      />
      <label className="block mb-2 text-sm">Password</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
        required
      />
      <button

        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Loading..." : isLogin ? "Login" : "Register"}
      </button>
      <p className="text-center text-sm mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
};

export default AuthForm;
