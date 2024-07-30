import { Link } from "react-router-dom";
import LatestLoading from "../../../Loading/LatestLoading";
import useGet from "../../../../Hooks/useGet";
import { motion } from "framer-motion";

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
}
const LatestBlogs = () => {

    const { data: blogs, isLoading } = useGet('/api/v1/blogsData') || {};
    if (isLoading) {
        return <LatestLoading />
    }

    const sortedBlogs = blogs?.sort((a, b) => new Date(b.date) - new Date(a.date));

    const latestThreeBlogs = sortedBlogs?.slice(0, 3);
    if (isLoading) {
        return <LatestLoading />
    }

    return (
        <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
         className="space-y-5">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">Latest Blogs</h2>
            {latestThreeBlogs?.map((blog) => (
                <div key={blog._id} className="flex items-center gap-2">
                    <div>
                        <img className="w-12 h-12 rounded-lg" src={blog?.image} alt="" />
                    </div>
                    <div>
                        <div id="link">
                            <Link className="md:text-md text-gray-600 font-semibold dark:text-gray-300"
                                to={`/blog/details/${blog?._id}`}
                            >
                                {blog?.title}
                            </Link>
                        </div>
                        <div className="text-sm flex gap-1 justify-center items-center">
                            <h2 className="text-xs md:text-sm dark:text-gray-300">{formatDate(blog?.date)}</h2> | <h2 className=" dark:text-gray-300">By <span className="font-semibold text-gray-700 dark:text-gray-400">{blog?.author}</span></h2>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default LatestBlogs;