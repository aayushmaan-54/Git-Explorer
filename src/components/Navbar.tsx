import { NavLink, Outlet } from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between font-bold text-[#7d34f1] px-4 pb-12 pt-4">
        <div>
          <h1 className="text-4xl">Git Explorer 🧭</h1>
        </div>
        <div>
          <ul className="flex gap-6 text-xl">
            <li><NavLink to={"/"}>Repos</NavLink></li>
            <li><NavLink to={"/users"}>Users</NavLink></li>
            <li><NavLink to={"/searchUsers"}>Search</NavLink></li>
            <li><NavLink to={"/userProfile"}>Profile</NavLink></li>
            <li><NavLink to={"/Login"}>Login</NavLink></li>
          </ul>
        </div>
      </div>
      <main className="flex items-center justify-center flex-wrap gap-14 px-8">
        <Outlet />
      </main>
    </>
  )
}

export default Navbar