import { Link } from "react-router-dom";
import images from "../../Constants/images";
import { HashLoader } from "react-spinners";

const Loading = () => {

  return (
    <div role="status" className="animate-pulse space-y-5">
      <div className="flex items-center justify-between shadow-lg w-full py-2 px-12">
        <Link to="/" className="flex">
          <img src={images?.logo} className="h-8" alt="logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog Haven</span>
        </Link>
        <div className="flex items-center gap-5">
          <div className="w-12 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="w-12 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="w-12 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="w-12 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="w-12 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>
          <svg className="w-12 h-12 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
      </div>
        <div className="flex items-center justify-center mx-auto h-screen">
          <HashLoader className="text-gray-600"/>
        </div>
    </div>
  );
};

export default Loading;
