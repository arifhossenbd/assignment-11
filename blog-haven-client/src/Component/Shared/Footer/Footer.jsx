import { Link, NavLink } from "react-router-dom";
import { images } from "../../../Constants";

const Footer = () => {
  return (
    <div className="bg-gray-100 outline outline-1 outline-white dark:outline-gray-500 shadow-xl py-4 dark:bg-gray-700 flex flex-col md:flex-row items-center justify-evenly space-y-2 md:space-y-0">
      <div className=" flex items-center text-center gap-2">
        <Link to="/" className="flex items-center rtl:space-x-reverse gap-2 hover:animate-pulse">
          <img src={images.logo} className="h-6 w-6 dark:bg-gray-100 bg-gray-200 shadow rounded-full" alt="Blog Haven Logo" />
          <span className="dark:text-white text-gray-700 hover:text-black">Blog Haven</span>
        </Link>
        <div>
          <h2 className="text-gray-500 text-center dark:text-gray-400 text-xs">© {new Date().getFullYear()}. <span className="">All Rights Reserved.</span>
          </h2>
        </div>
      </div>
      <div>
        <ul id="link" className="flex items-center gap-2 md:gap-5 text-sm md:font-medium text-gray-500 dark:text-gray-300">
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <a href="#">Licensing</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <Link to={`/login`}>Login</Link>
          </li>
          <li>
            <Link to={`/registration`}>Sign up</Link>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Footer;
