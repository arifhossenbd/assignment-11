import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
    return (
        <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="space-y-5">
            <motion.h2
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">Category</motion.h2>
            <motion.div
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                id="link" className="w-full border-white border-y space-x-2 text-center divide-x-2 divide-white py-1">
                <NavLink className={({ isActive }) => isActive ? 'text-green-500 md:font-bold md:text-lg font-semibold' : 'hover:md:font-semibold dark:text-white hover:text-green-500'} to="/blogs/food">Food</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'text-blue-500 md:font-bold md:text-lg font-semibold pl-1' : 'hover:md:font-semibold dark:text-white hover:text-blue-500 pl-1'} to="/blogs/technology">Technology</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'text-fuchsia-500 md:font-bold md:text-lg font-semibold pl-1' : 'hover:md:font-semibold dark:text-white hover:text-fuchsia-500 pl-1'} to="/blogs/health">Health</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'text-orange-500 md:font-bold md:text-lg font-semibold pl-1' : 'hover:md:font-semibold dark:text-white hover:text-orange-500 pl-1'} to="/blogs/fashion">Fashion</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'text-violet-500 md:font-bold md:text-lg font-semibold pl-1' : 'hover:md:font-semibold dark:text-white hover:text-violet-500 pl-1'} to="/blogs/travel">Travel</NavLink>
            </motion.div>
        </motion.div>
    );
};

export default Categories;