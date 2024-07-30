import { Link } from "react-router-dom";
import TableLoading from "../../../Component/Loading/TableLoading";
import { Helmet } from "react-helmet-async";
import useGet from "../../../Hooks/useGet";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


function formatDate(dateString) {

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
}

const FeaturesBlog = () => {
    const [blogs, setBlogs] = useState([])
    const { data, isLoading, status, error } = useGet('/api/v1/blogs') || {};
    useEffect(() => {
        if (data) {
            setBlogs(data?.blogsData);
        }
    }, [data]);
    if (isLoading) {
        return <TableLoading />;
    }

    if (status === 'error' && !blogs || blogs?.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2>Health blog currently not available</h2>
                {error && <p>{error.message}</p>}
                <Link className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg" to="/">Go Home Page</Link>
            </div>
        );
    }
    const sortedBlogs = blogs?.filter(blog => blog?.fullDesc)?.sort((a, b) => b.fullDesc?.length - a?.fullDesc?.length) || [];

    return (
        <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="lg:w-9/12">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <Helmet>
                    <title>Blog Haven | Feature</title>
                </Helmet>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs">
                        <tr className="text-gray-700 w-full uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300">
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <label className="">Number</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" className="px-12 py-3">
                                Blog Image
                            </th>
                            <th scope="col" className="px-12 py-3">
                                Blog Title
                            </th>
                            <th scope="col" className="pr-6 py-3">
                                Created Date
                            </th>
                        </tr>
                    </thead>
                    <motion.tbody
                        initial={{ x: 1000 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 1, duration: 1.5 }}
                    >
                        {sortedBlogs?.map((blog, idx) => (
                            <tr key={blog?._id} className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 hover:outline outline-1 outline-white dark:outline-gray-500">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <label className="">{idx + 1}</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={blog?.authorImg} alt="author" />
                                    <div className="ps-3">
                                        <div className="md:text-base md:font-semibold">{blog?.author}</div>
                                        <div className="font-normal text-gray-500 dark:text-white">{blog?.email}</div>
                                    </div>
                                </th>
                                <td className="px-12 py-4">
                                    <img className="w-36 h-12 rounded-lg" src={blog?.image} alt="image" />
                                </td>
                                <td id="link" className="px-12 py-4 dark:text-white">
                                    <Link
                                        to={`/blog/details/${blog?._id}`}
                                    >
                                        {blog?.title}
                                    </Link>
                                </td>
                                <td className="w-36 dark:text-white">
                                    {formatDate(blog?.date)}
                                </td>
                            </tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </motion.div>
    );

};

export default FeaturesBlog;
