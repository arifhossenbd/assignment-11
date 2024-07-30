import { Link } from "react-router-dom";
import DataLoading from "../../Component/Loading/DataLoading";
import { Helmet } from "react-helmet-async";
import HealthCard from "./HealthCard";
import useGet from "../../Hooks/useGet";
import { motion } from "framer-motion";

const Health = () => {

    const { data: blogs, isLoading, status, error } = useGet('/api/v1/blogsData') || {};
    const health = blogs?.filter(health => health?.category === "health")

    if (isLoading) {
        return <DataLoading />;
    }

    if (status === 'error' && !health || health.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2>Health blog currently not available</h2>
                {error && <p>{error.message}</p>}
                <Link className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg" to="/">Go Home Page</Link>
            </div>
        );
    }

    return (
        <div className="md:w-9/12">
            <Helmet>
                <title>Blog Haven | Health</title>
            </Helmet>
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="space-y-10">
                {(
                    health?.map((health) => (
                        <HealthCard key={health?._id} blogs={health}></HealthCard>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default Health;