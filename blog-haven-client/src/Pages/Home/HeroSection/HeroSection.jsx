
import { SyncLoader } from "react-spinners";
import HeroCard from "./HeroCard";
import useGet from "../../../Hooks/useGet";
import { useEffect, useState } from "react";

const HeroSection = () => {
    const [blogs, setBlogs] = useState([])
    const { data, isLoading, status, error } = useGet('/api/v1/blogsData') || {};
    useEffect(() => {
        if (data) {
            setBlogs(data);
        }
    }, [data]);
    if (isLoading) {
        return <div className="w-full flex justify-center"><SyncLoader /></div>
    }    
    if (status === 'error' && !blogs || blogs.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2>Blogs currently not available</h2>
                {error && <p>{error.message}</p>}
            </div>
        );
    }
    const fashions = blogs?.filter(fashion => fashion?.category === "fashion")
    const sortedBlogs = fashions?.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestThreeBlogs = sortedBlogs?.slice(0, 3);

    return (
        <div className="space-y-24 pb-16 md:w-[520px] lg:w-[620px] xl:w-[820px]">
            {(
                latestThreeBlogs?.map((fashion) =>
                    <HeroCard key={fashion?._id} blogs={fashion}></HeroCard>)
            )}
        </div>
    );
};

export default HeroSection;