import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { useEffect } from "react";
import { STATUSES } from "../Redux/Slices/HomeSlice";
import { fetchUsers, GitHubUser } from "../Redux/Slices/UserSlice";
import { Link } from "react-router-dom";


const Users = () => {

  const dispatch = useDispatch<AppDispatch>();
  const usersState = useSelector((state: RootState) => state.users);
  
  console.log(usersState.data);

  useEffect(() => {
    if (usersState.status === STATUSES.IDLE) {
      dispatch(fetchUsers());
    }
  }, []); 

  if (usersState.status === STATUSES.LOADING) {
    return <div>Loading...</div>;
  }

  if (usersState.status === STATUSES.ERROR) {
    return <div>Error fetching users</div>;
  }

  console.log(usersState);
  

  return (
    <>
      {usersState.data.map((user: GitHubUser) => (
        <div className="flex flex-col items-center">
          <img src={user.avatar_url} alt={user.login} className="w-[200px]" />
          <h1 className="text-center pb-2">{user.login}</h1>
          <Link to={`/users/user/${user.login}`} className="bg-[#181819] py-1 rounded-lg px-4 hover:bg-[#0e0d0d] outline outline-1 outline-white hover:outline-indigo-600 transition-all duration-200">View User</Link>
        </div>
      ))}
    </>
  )
}

export default Users
