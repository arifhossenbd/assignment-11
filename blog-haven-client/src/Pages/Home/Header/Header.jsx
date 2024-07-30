import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import HeaderLoading from "../../../Component/Loading/HeaderLoading";
import useGet from "../../../Hooks/useGet";
import { useEffect, useState } from "react";

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
}

const Header = () => {
       
    const { data, isLoading, status, error } = useGet('/api/v1/blogs') || {}; 
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        if (data) {
            setBlogs(data?.blogsData);
        }
    }, [data]);
    const sortedBlogs = blogs?.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (isLoading) {
        return <HeaderLoading />;
    }

    if (status === 'success' && !sortedBlogs || status === 'error' &&  blogs.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2 className="dark:text-white">Blogs currently not available</h2>
                <h2>{error && <p className="dark:text-white">{error.message}</p>}</h2>
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
        <div className="md:w-[520px] lg:w-[620px] xl:w-[820px]">
            <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
                {sortedBlogs?.map((blogs) => (
                    <div key={blogs?._id}>
                        <div className="md:h-96 h-64 w-full cover-file object-center" style={{ backgroundImage: `url(${blogs?.image})`, backgroundSize: 'cover', display: 'flex', flexDirection: 'column' }}>
                            <div className="md:pt-32 pt-12 text-white space-y-2  dark:text-gray-200">
                                <div className="inline-flex items-center justify-center md:gap-5 gap-2 w-full">
                                    <hr className="md:w-20 w-10 h-0.5 bg-gray-200 border-0 dark:text-gray-400" />
                                    <h2 className="md:text-base md:font-semibold text-xs uppercase hover:text-sky-500"><Link to={`/blogs/${blogs?.category}`}>{blogs?.category}</Link></h2>
                                    <hr className="md:w-20 w-10 h-0.5 bg-gray-200 border-0 dark:text-gray-400" />
                                </div>
                                <Link id="link" className="text-2xl md:text-4xl font-semibold rounded-t-lg p-2 hover:text-pink-500"
                                    to={`/blog/details/${blogs?._id}`}
                                >
                                    {blogs?.title}
                                </Link>
                                <div className="text-sm flex gap-1 justify-center items-center hover:text-indigo-600">
                                    <h2 className=" text-xs md:text-sm">{formatDate(blogs?.date)}</h2> | <h2 className="text-xs md:text-base font-semibold">BY <span className="uppercase">{blogs?.author}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Header;
