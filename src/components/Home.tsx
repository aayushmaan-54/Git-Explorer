import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../Redux/Store';
import { Repository, STATUSES, fetchRepositories } from '../Redux/Slices/HomeSlice';
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: repos, status } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    if (status === STATUSES.IDLE) {
      dispatch(fetchRepositories());
    }
  });

  if (status === STATUSES.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === STATUSES.ERROR) {
    return <div>Error fetching repositories</div>;
  }

  return (
    <div>
      {repos.map((repo: Repository) => (
        <div key={repo.id} className="text-center pb-10">
          <img src={repo.owner.avatar_url} alt="user avatar" className="w-[200px]" />
          <h2>{repo.name}</h2>
          <p className="text-red-600">Language: {repo.language}</p>
          <p className="pb-4">
            <span>By: </span>
            <Link to={`/users/user/${repo.owner.login}`} className="text-indigo-600">
              {repo.owner.login}
            </Link>
          </p>
          <Link
            to={`/repo-details/${repo.name}/${repo.owner.login}`}
            className="bg-[#181819] py-2 rounded-lg px-4 hover:bg-[#0e0d0d] outline outline-1 outline-white hover:outline-indigo-600 transition-all duration-200"
          >
            View Repository
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;