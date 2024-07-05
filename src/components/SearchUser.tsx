import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SearchUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(3);
  const [username, setUsername] = useState<string>(""); 
  const navigate = useNavigate();

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      if (response.status === 200) {
        navigate(`/users/user/${username}`);
      }
    } catch (err: any) {
      throw new Error('User not found');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (username) {
      try {
        await handleGetUser();
      } catch (err: any) {
        setLoading(false);
        setAttempts((currentAttempt) => currentAttempt - 1);
        setErrorMsg(`User Does Not Exist! ${attempts - 1} Attempts remaining`);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (attempts <= 0) {
      setErrorMsg("Too many attempts, REDIRECTING...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [attempts, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold text-center mt-36 mb-5">Search</h1>
        {error && (
          <span className="text-sm text-red-500 block">
            {errorMsg}
          </span>
        )}

        <input
          type="text"
          placeholder="Enter Username..."
          className=" bg-[#181819] py-1 rounded-lg px-4 hover:bg-[#0e0d0d] outline outline-1 outline-white hover:outline-indigo-600 transition-all duration-200 mr-4 w-[50vw]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className=" bg-[#181819] py-1 rounded-lg px-4 hover:bg-[#0e0d0d] outline outline-1 outline-white hover:outline-indigo-600 focus:outline-indigo-600 active:outline-indigo-600 transition-all duration-200"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
    </>
  );
};

export default SearchUser;