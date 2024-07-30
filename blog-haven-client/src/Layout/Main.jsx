import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar/Navbar";
import Footer from "../Component/Shared/Footer/Footer";
import SideBar from "../Component/Shared/SideBar/SideBar";
import NewsLetter from "../Component/Shared/NewsLetter/NewsLetter";
import { motion, useScroll } from "framer-motion";
import useGet from "../Hooks/useGet";
import Loading from "../Component/Loading/Loading";

const Main = () => {
    
    const { scrollYProgress } = useScroll();
    const { data, isLoading, status, error } = useGet('/api/v1/blogs') || {}
    const blogs = data?.blogsData
    if (isLoading) {
        return <Loading />;
    }

    if (!data && status === 'success' || status === 'error' || blogs?.length === 0) {
        return (
          <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2 dark:text-white">
            <h2>Blogs currently not available.</h2>
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

    return (
        <div>
            <Navbar />
            <div className="pt-20 min-h-[calc(100vh-64px)] px-4 md:px-12 lg:px-14 my-4">
                <div className="flex flex-col md:flex-row md:gap-5">
                    <Outlet />
                    <SideBar />
                </div>
            </div>
            <div className="md:mt-12 mt-5">
                <NewsLetter />
                <Footer />
            </div>
            <motion.div
                className="progress"
                style={{ scaleX: scrollYProgress }}
            />
        </div>
    )
};

export default Main;