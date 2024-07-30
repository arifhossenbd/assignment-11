/* eslint-disable react/no-unescaped-entities */
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Comments from "../CommentSection/Comments";
import useGet from "../../Hooks/useGet";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";

function toNormalCase(str) {
  return str ? str.replace(/\b\w/g, (match) => match.toUpperCase()) : "";
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}
const BlogDetails = () => {

  const { id } = useParams();
  const { data, status, error, isLoading } = useGet(`/api/v1/blog/${id}`) || {};
  const [blog, setBlog] = useState([])
  useEffect(() => {
    if (data) {
      setBlog(data);
    }
  }, [data]);
  if (isLoading) {
    return <div className="flex items-center justify-center mx-auto h-screen"><HashLoader /></div>;
  }
  if (status === 'error' && !blog || blog?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
        <h2>Blog currently not available</h2>
        {error && <p>{error.message}</p>}
        <Link className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg" to="/">Go Blogs Page</Link>
      </div>
    );
  }
  const { title, category, shortDesc, fullDesc, image, date, author, authorImg } = blog;

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="md:w-9/12 relative">
      <Helmet>
        <title>Blog Haven | Details</title>
      </Helmet>
      <div className="md:space-y-12 space-y-6">
        <div className="flex flex-col items-center justify-center mx-auto md:gap-4 gap-2">
          <div className="flex items-center justify-center mx-auto md:gap-4 gap-2">
            <hr className="w-12 text-gray-400 border-1 rounded" />
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              id="link">
              <Link to={`/blogs/${category}`} className="md:text-lg text-gray-500 md:font-semibold dark:text-white">
                {toNormalCase(category)}
              </Link>
            </motion.div>
            <hr className="w-12 text-gray-400 border-1 rounded" />
          </div>
          <motion.h1
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ delay: 1, duration: 1 }} className="lg:text-6xl md:text-3xl text-2xl text-gray-700 text-center dark:text-white">{title}</motion.h1>
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center items-center dark:text-gray-200 gap-1">
            <p className="hover:text-indigo-600 text-xs md:text-sm">{formatDate(date)}</p>| <h2 className="text-gray-700 text-xs md:text-base font-semibold dark:text-gray-300">BY <span className="uppercase hover:text-fuchsia-500">{author}</span></h2>
          </motion.div>
        </div>
        <div>
          <motion.img
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="" src={image} alt="img" />
        </div>
        <div className="dark:text-white">
          <p id="firstLetter">{shortDesc}</p>
          <p>{fullDesc}</p>
        </div>
        <div className="flex gap-5 outline outline-1 outline-gray-700 shadow p-8 w-full rounded-2xl">
          <motion.img className="rounded-full md:w-24 md:h-24 w-12 h-12" src={authorImg} alt="img"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
          />
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <div className="flex justify-between">
              <div className="space-y-2">
                <h2 className="text-gray-700 md:text-2xl text-xl font-semibold dark:text-white">Blogger</h2>
                <h2 className="md:text-xl text-sm font-semibold text-gray-600 dark:text-gray-300">{author}</h2></div>
              <div className="space-y-3">
                <div><Link to="https://github.com/arifhossenbd" target="_blank">
                  <FaGithub className="bg-slate-200 hover:bg-blue-200 hover:duration-150 w-10 h-10 p-2 rounded-full" />
                </Link></div>
                <div> <Link to="http://facebook.com/iarifhussain" target="_blank">
                  <FaLinkedin className="bg-slate-200 hover:bg-blue-200 hover:duration-150 w-10 h-10 p-2 rounded-full" />
                </Link></div>
                <div> <Link to="http://facebook.com/iarifhussain" target="_blank">
                  <FaFacebook className="bg-slate-200 hover:bg-blue-200 hover:duration-150 w-10 h-10 p-2 rounded-full" />
                </Link></div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="md:text-lg text-sm font-semibold  text-gray-600 dark:text-white">Hello dear</h2>
              <h2 className="dark:text-white text-gray-500">Exciting news! Our blog is now live, offering a diverse array of topics to cater to all interests. From delectable food recipes to fashion trends, travel escapades to tech insights, health tips to inspiring stories – we've got it covered. Join our community and share your expertise, experiences, and passions. Let's create a space where everyone feels welcome and inspired. Stay tuned for updates and spread the word!</h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <Comments blogs={data} />
      </div>
    </motion.div>
  );
};

export default BlogDetails;
