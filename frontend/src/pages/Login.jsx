import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom"; // useNavigate = redirect
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refreshToken = async () => {
    const reftoken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("users/userapi/token/refresh/", {
        refresh: reftoken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, String(res.data.access));
      } else {
      }
    } catch {}
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (username && password) {
      try {
        const res = await api.post("users/userapi/token/", {
          username,
          password,
        });
        localStorage.setItem(REFRESH_TOKEN, String(res.data.refresh));
        await refreshToken();
        navigate("/");
      } catch (error) {
        if (error.status == "401") {
          alert("wrong credentials");
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("all fields must be filled");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Login to FriendsBook</h1>

        <p className="mt-4 text-gray-500 italic">Login to your account!</p>
      </div>

      <form
        action="post"
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter Username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <Link className="underline" to="/register">
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
