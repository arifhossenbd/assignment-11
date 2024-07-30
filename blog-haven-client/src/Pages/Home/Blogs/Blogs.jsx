import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DataLoading from "../../../Component/Loading/DataLoading";
import { Helmet } from "react-helmet-async";
import BlogsCard from "./Card";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Blogs = () => {

  const axiosPublic = useAxiosPublic() || [];
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;
  const { data, isLoading, status, error, refetch } = useQuery({
    queryKey: [currentPage, itemsPerPage],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/api/v1/blogs?page=${currentPage}&size=${itemsPerPage}&query=${searchQuery}`);
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setBlogs(data?.blogsData);
    }
  }, [searchQuery, data]);

  if (isLoading) {
    return <DataLoading />;
  }

  const numberOfPages = data ? Math.ceil(data?.totalCount / itemsPerPage) : 0;
  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    refetch()
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    refetch();
  };

  if (searchQuery && status === 'success' && blogs?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
        <h2 className=" dark:text-white">No results found for {searchQuery}.</h2>
        {error && <p className=" dark:text-white">{error.message}</p>}
        <button
          className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Reload for Blogs
        </button>
      </div>
    );
  }

  if (!data && status === 'error' || blogs?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
        <h2 className=" dark:text-white">Blogs currently not available.</h2>
        {error && <p className=" dark:text-white">{error.message}</p>}
        <button
          className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg dark:text-white"
          onClick={() => window.location.reload()}
        >
          Reload for Blogs
        </button>
      </div>
    );
  }

  return (
    <motion.div
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    transition={{ delay: 0.5, duration: 1.5 }}
     className="md:w-9/12">
    <Helmet>
      <title>Blog Haven | Blogs</title>
    </Helmet>
      <div className="space-y-5">
        {/* Search section */}
          <form onSubmit={handleSearchSubmit} className="relative lg:w-96 xl:w-[405px]">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              type="text" placeholder="Search here..." className="input hover:border hover:border-gray-600 rounded-full w-full dark:bg-gray-900 dark:text-white" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </form>
          {/* All blog and pagination section */}
        <div className="space-y-12 text-center">
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
           className="space-y-10">
            {(
              blogs?.map((blog) => (
                <BlogsCard key={blog._id} blogs={blog}></BlogsCard>
              ))
            )}
          </motion.div>
          <nav>
            <ul className="inline-flex text-base h-10">
              <li>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              <li>
                {pages.map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => setCurrentPage(page + 1)}
                    className={
                      currentPage === page + 1
                        ? "px-4 h-10 leading-tight text-gray-700 bg-gray-300 border border-gray-400 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-600 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    }
                  >
                    {page + 1}
                  </button>
                ))}
              </li>
              <li>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === numberOfPages}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;
