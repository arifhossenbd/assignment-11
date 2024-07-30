import { useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import images from "../../../Constants/images";
import { useClickOutside } from "../../../Hooks/useClickOutside";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import DarkMode from "../../../Providers/DarkMode";

const Navbar = () => {

  const { user, logOut } = useAuth();
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const userMenuRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || location?.pathname;

  const closeUserMenu = () => {
    setIsOpenUser(false);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  useClickOutside(userMenuRef, closeUserMenu);
  useClickOutside(menuRef, closeMenu);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.custom(
        <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2">
          <div className="flex justify-center mx-auto"><PulseLoader /></div>
          <h2 className="md:text-2xl text-xl font-semibold">Come back again!</h2>
          <h2 className="md-text-xl font-semibold text-pink-900">Mr/Ms, {user.displayName}!</h2>
          <p>You have successfully logged out.</p>
        </div>
      );
      navigate(from) || "/";
    } catch (error) {
      toast.error(error.message)
      navigate(from) || "/";
    }
  };

  const navLinks =
    <motion.nav
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      id="nav" className="md:flex md:flex-row md:items-center lg:gap-5 gap-2 flex flex-col">
      <NavLink className={({ isActive }) => isActive ? ' font-semibold text-base dark:text-gray-400 md:font-extrabold' : 'font-medium md:text-base text-sm hover:font-bold dark:text-white'} to="/">Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? 'md:font-extrabold  font-semibold text-sm dark:text-gray-400 dark:font-extrabold' : 'font-medium md:text-base text-sm hover:font-bold dark:text-white'} to="/blogs">Blogs</NavLink>
      <NavLink className={({ isActive }) => isActive ? 'md:font-extrabold  font-semibold text-sm dark:text-gray-400 dark:font-extrabold' : 'font-medium md:text-base text-sm hover:font-bold dark:text-white'} to="/blogs/feature">Feature</NavLink>
      <NavLink className={({ isActive }) => isActive ? 'md:font-extrabold  font-semibold text-sm dark:text-gray-400 dark:font-extrabold' : 'font-medium md:text-base text-sm hover:font-bold dark:text-white'} to="/blogs/wishlist">Wishlisht</NavLink>
      {
        user && (
          <NavLink className={({ isActive }) => isActive ? 'md:font-extrabold  font-semibold text-sm dark:text-gray-400 dark:font-extrabold' : 'font-medium md:text-base text-sm hover:font-bold dark:text-white'} to="/blog/create">Add Blog</NavLink>
        )
      }
    </motion.nav>
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-gray-200 shadow z-50 dark:bg-gray-700 pt-2 border-white dark:border-gray-500">
        <motion.div className="flex w-full items-center justify-between px-4 lg:px-12 py-3"
          initial={{ y: -120 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.5 }}
          onScroll={{ delay: -120 }}
        >
          <Link to="/" className="flex items-center hover:animate-pulse gap-1">
            <img src={images.logo} className="md:h-10 md:w-10 h-8 w-8 bg-gray-300 dark:bg-gray-500 rounded-full" alt="Blog Haven Logo" />
            <span className="md:text-2xl text-sm hover:font-extrabold font-semibold whitespace-nowrap dark:text-gray-200 hover:text-black">Blog Haven</span>
          </Link>
          <div className="flex items-center md:order-2 flex-row-reverse relative z-10 gap-3">
            <div className="flex items-center gap-5 md:gap-0">
              <div>
                <button
                  onClick={() => setIsOpenMenu(!isOpenMenu)} className="block md:hidden items-center dark:text-white">
                  <CiMenuFries className="size-5" />
                </button>
                {
                  isOpenMenu && (
                    <motion.div
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      ref={menuRef} className="absolute right-3 mt-5 p-2 bg-white divide-y divide-gray-100 rounded-lg md:px-6 px-4 shadow dark:bg-gray-600 dark:divide-gray-600 z-50">
                      {navLinks}
                    </motion.div>
                  )
                }
              </div>
              <DarkMode />
            </div>
            <div
              className="w-full">
              {user ? (
                <div
                  className="flex w-full">
                  <button onClick={() => setIsOpenUser(!isOpenUser)} className="flex text-sm bg-gray-900 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                    <img src={user?.photoURL} className="md:w-10 w-6 md:h-10 h-6 rounded-full" alt="" />
                  </button>
                  {
                    isOpenUser && (
                      <motion.div
                        initial={{ y: -200 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}>
                        <motion.ul
                          initial={{ x: 100 }}
                          animate={{ x: 0 }}
                          transition={{ delay: 0.3, duration: 0.7 }}
                          ref={userMenuRef} className="absolute right-1 md:top-14 top-10 2xl:w-96 lg:w-52 z-50 bg-white divide-y divide-gray-300 rounded-lg shadow dark:bg-gray-500 dark:divide-gray-600">
                          <li className="block hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white py-2 px-4 rounded-t-lg">
                            {user?.displayName}
                          </li>
                          <li className="block hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white py-2 px-4 rounded-b-lg">
                            {user?.email}
                          </li>
                          <li onClick={handleLogout} className="block px-4 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-400 dark:text-gray-200 dark:hover:text-white py-2 cursor-pointer rounded-b-lg">
                            Log out
                          </li>
                        </motion.ul>
                      </motion.div>
                    )
                  }
                </div>
              ) : (
                <Link to="/login" className="text-gray-900 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 md:font-medium rounded-lg text-sm px-2 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-600 focus:outline-none dark:focus:ring-gray-900">Login</Link>
              )}
            </div>
          </div>
          {/* medium device and above */}
          <div className="hidden md:block">
            {navLinks}
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
