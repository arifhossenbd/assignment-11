import { Link } from "react-router-dom";
import DataLoading from "../../Component/Loading/DataLoading";
import useGet from "../../Hooks/useGet";
import { Helmet } from "react-helmet-async";
import TechnologyCard from "./TechnologyCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Technology = () => {

    const { data, isLoading, status, error } = useGet('/api/v1/blogsData') || {};
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        if (data) {
            setBlogs(data);
        }
    }, [data]);
    const technology = blogs?.filter(technology => technology?.category === "technology")

    if (isLoading) {
        return <DataLoading />;
    }

    if (status === 'error' && !technology || technology.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2>Technology blog currently not available</h2>
                {error && <p>{error.message}</p>}
                <Link className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg" to="/">Go Home Page</Link>
            </div>
        );
    }

    return (
        <div className="md:w-9/12">
            <Helmet>
                <title>Blog Haven | Technology</title>
            </Helmet>
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="space-y-10">
                {(
                    technology?.map((technology) => (
                        <TechnologyCard key={technology?._id} blogs={technology}></TechnologyCard>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default Technology;