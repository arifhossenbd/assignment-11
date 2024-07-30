import LatestBlogs from "./LatestBlogs/LatestBlogs";
import Categories from "./Categories/Categories";
import CommentSection from "./CommentSection/CommentSection";
import { motion } from "framer-motion";

const SideBar = () => {
    return (
        <div className="md:w-6/12 lg:w-4/12 my-12 md:my-0" >
            <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="shadow-lg outline outline-white bg-gray-200 p-4 space-y-5 rounded-2xl dark:outline outline-1 dark:outline-gray-500 dark:shadow-lg dark:bg-gray-800">
                <LatestBlogs />
                <Categories></Categories>
                <CommentSection></CommentSection>
            </motion.div>
        </div>
    );
};

export default SideBar;