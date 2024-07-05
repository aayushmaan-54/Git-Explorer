import axios from "axios";
import { useEffect, useState } from "react";

type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

const Profile = () => {  
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const username = 'aayushmaan-54';
  const URL = `https://api.github.com/users/${username}`;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get<GithubUser>(URL);
        setUserData(response.data);
      } catch (e) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, [username, URL]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {userData && (
        <article className="flex items-center justify-center gap-8 mt-32 flex-wrap pb-10">
          <img src={userData.avatar_url} alt={userData.name ? userData.name : "user"} className="w-[300px]" />
          <div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-red-500">{userData.login}</p>
              <p className="text-3xl font-bold my-4">{userData.name}</p>
              <p className=" my-2">{userData.location}</p>
              <p className="flex items-center justify-center gap-8"><span>Followers: {userData.followers}</span> <span>Following: {userData.following}</span></p>
              <a className="font-bold text-blue-500 my-4 underline" href={`https://x.com/${userData.twitter_username}`}>X(Twitter): <span>{userData.twitter_username}</span></a>
              <a href={userData.html_url} className="text-indigo-600 underline mt-2">View on Github</a>
            </div>
            <hr className="mb-10 mt-10" />
            <div>
              <h3 className="px-10">{userData.bio}</h3>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default Profile