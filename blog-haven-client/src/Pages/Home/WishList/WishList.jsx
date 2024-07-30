import { Helmet } from "react-helmet-async";
import WishlistTable from "./WishlistTable";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import TableLoading from "../../../Component/Loading/TableLoading";
import { motion } from "framer-motion";

const WishList = () => {
    const { user } = useAuth();
    const userEmail = user?.email || "";
    const [wishlists, setWishlists] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data, refetch, status, error, isLoading } = useQuery({
        queryKey: ["wishlists", userEmail],
        queryFn: async () => {
            if (!userEmail) {
                throw new Error("User is not authenticated.");
            }
            try {
                const res = await axiosSecure.get(`/api/v1/wishlists/?email=${userEmail}`);
                return res.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        enabled: !!userEmail, // Only run query if userEmail is not empty
    });

    useEffect(() => {
        if (data) {
            const userWishlist = data?.filter(blog => blog?.email === userEmail);
            setWishlists(userWishlist);
        }
    }, [data, userEmail]);

    if (isLoading) {
        return <TableLoading />;
    }

    if (status === 'error' || !data || data?.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2 className="dark:text-white">Wishlist currently not available</h2>
                {error && <p className="dark:text-white">{error.message}</p>}
                <Link className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg" to="/blogs">Go to the Blogs</Link>
            </div>
        );
    }

    return (
        <div className="md:w-9/12 overflow-x-auto rounded-xl">
            <Helmet>
                <title>Blog Haven | Wishlist</title>
            </Helmet>
            <motion.table
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
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
                        <th scope="col" className="pr-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <motion.tbody
                    initial={{ x: -500 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                >
                    {wishlists?.map((wishlist, idx) =>
                        <WishlistTable
                            key={idx}
                            wishlists={wishlist}
                            refetch={refetch}
                            id={wishlist?._id}
                            idx={idx}
                        />
                    )}
                </motion.tbody>
            </motion.table>
        </div>
    );
};

export default WishList;