import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [resume, setResume] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (username && email && name && resume && password && password) {
      if (password == password2 && password.length >= 8) {
        try {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("password2", password2);
          formData.append("resume", resume);

          try {
            const response = await api.post("users/register/", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(response.data);
            navigate("/login");
          } catch (error) {
            console.error("Error:", error);
          }
        } catch (error) {
          alert("some error occured, please try again");
        } finally {
          setLoading(false);
        }
      } else {
        alert("make sure passwords match and are long enough.");
      }
    } else {
      alert("all fields must be filled.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Register Now!</h1>
        <p className="mt-4 text-gray-500">
          Create your account and submit your resume.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="resume" className="sr-only">
            Resume
          </label>
          <input
            type="file"
            name="resume"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Already have an account?
            <Link className="underline" to={"/login"}>
              Log in
            </Link>
          </p>
          {loading ? (
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-200 px-5 py-3 text-sm font-medium text-white text-opacity-10">
              In progress...
            </button>
          ) : (
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
