import { Link, NavLink } from "react-router";
import Logo from "../../../Comoponents/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/aboutUs"}>About Us</NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then((res) => {
        console.log(res).user;
        toast.success("Sign out success");
      })
      .catch((err) => toast.error(err.code));
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="max-w-7xl mx-auto navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end gap-3">
            {user ? (
              <Link
                to={"/"}
                onClick={handleSignOut}
                className="btn btn-outline text-black"
              >
                Sign Out
              </Link>
            ) : (
              <Link to={"/login"} className="btn btn-outline text-black">
                Sign In
              </Link>
            )}
            <Link to={"/rider"} className="btn btn-primary text-black">
              Be a rider
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
