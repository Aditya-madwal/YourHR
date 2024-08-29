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

        <p className="mt-4 text-gray-500 italic">"Connect, Share, Thrive!"</p>
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

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
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

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
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
