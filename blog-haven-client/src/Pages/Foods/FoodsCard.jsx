import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingButton from "../../Component/LoadingButton/LoadingButton";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
}
function toNormalCase(str) {
  return str ? str?.replace(/\b\w/g, match => match.toUpperCase()) : "";
}
const FoodsCard = ({ blogs }) => {

  const { user } = useAuth()
  const userEmail = user?.email || ""
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || location?.pathname;
  const [wishlists, setWishlists] = useState([]);

  const { data, refetch } = useQuery({
    queryKey: ["wishlists", userEmail],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/api/v1/wishlists/?email=${userEmail}`);
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  useEffect(() => {
    if (data) {
      const userWishlist = data?.filter(wishlist => wishlist?.email === userEmail);
      setWishlists(userWishlist);
    }
  }, [data, userEmail]);

  const handleWishlist = async () => {
    const isExists = wishlists?.some(wishlist => wishlist?.blogId === blogs?._id)
    if (isExists) {
      toast.error("This blog is already in your wishlist!")
      return navigate(from) || "/blogs";
    }
    try {
      const addToWishlist = {
        blogId: blogs?._id,
        image: blogs?.image,
        title: blogs?.title,
        category: blogs?.category,
        shortDesc: blogs?.shortDesc,
        fullDesc: blogs?.fullDesc,
        author: blogs?.author,
        authorImg: blogs?.authorImg,
        authorEmail: blogs?.email,
        createdAt: blogs?.date,
        email: userEmail,
      };
      await axiosSecure.post("/api/v1/create-wishlist", addToWishlist);
      toast.custom(
        <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2">
            <div className="flex justify-center mx-auto"><PulseLoader /></div>
            <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
            <h2 className="md:text-xl font-semibold text-pink-800">{user?.displayName}</h2>
          <p>{blogs?.title} has been added to your wishlist.!</p>
        </div>
      )
      refetch();
      navigate(from) || "/";
    } catch (error) {
      toast.error(error.message);
    } finally {
      refetch();
      navigate(from) || "/";
    }
  }

  const accessData = blogs && blogs?.email === user?.email;

  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 1.5 }}
      className="text-left lg:flex flex-grow w-full space-y-5 rounded-2xl dark:bg-gray-800 shadow-lg outline outline-1 outline-white dark:outline-gray-500 bg-gray-200 dark:text-gray-400 dark:hover:text-white">
      <figure>
        <motion.img
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="md:h-[340px] md:w-[820px] rounded-2xl" src={blogs?.image} alt="image" />
      </figure>
      <motion.div
    initial={{ x: 1000 }}
    animate={{ x: 0 }}
    transition={{ delay: 0.5, duration: 1.5 }}
       className="w-full space-y-5 lg:p-6 p-8">
        <div className="w-full space-y-4">
          <div>
            <Link className="lg:text-base shadow lg:font-medium hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-50 outline outline-white dark:hover:bg-gray-500 dark:hover:text-black  hover:text-black text-gray-600 hover:outline outline-1 rounded-lg w-fit px-4 py-2 normal-case my-4">
              {toNormalCase(blogs?.category)}
            </Link>
          </div>
          <motion.h2
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            id="link" className="md:text-2xl text-gray-500 hover text-xl md:font-semibold dark:text-white dark:hover:text-gray-500">
            <Link
              to={`/blog/details/${blogs?._id}`}
            >
              {blogs?.title}
            </Link>
          </motion.h2>
          <h2 className="md:text-lg font-medium my-2 dark:text-white">{blogs?.shortDesc}</h2>
          <div className=" text-gray-500 text-sm dark:text-white">
            <span className="inline-flex gap-1"><FaCalendar className="text-gray-400" />{formatDate(blogs?.date)}</span>
            <p>By <span className="uppercase font-semibold">{blogs?.author}</span></p>
          </div>
        </div>
        <div>
          {
            accessData ?
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <LoadingButton className="md:text-lg font-medium w-24" to={`/blog/details/${blogs?._id}`} btnLabel={`Details`} />
                </div>
                <div>
                  <LoadingButton onClick={handleWishlist} className="md:text-lg font-medium w-24" btnLabel={`Wishlist`} />
                </div>
                <div>
                  <LoadingButton className="md:text-lg font-medium w-24" to={`/blog/update/${blogs?._id}`} btnLabel={`Update`} />
                </div>
              </div>
              :
              <div>
                {
                  userEmail ?
                    <div className="flex items-center gap-2">
                      <div>
                        <LoadingButton className="md:text-lg font-medium w-24" to={`/blog/details/${blogs?._id}`} btnLabel={`Details`} />
                      </div>
                      <div>
                        <LoadingButton onClick={handleWishlist} className="md:text-lg font-medium w-24" btnLabel={`Wishlist`} />
                      </div>
                    </div>
                    :
                    <div className="flex items-start">
                      <LoadingButton className="md:text-lg font-medium w-24" to={`/blog/details/${blogs?._id}`} btnLabel={`Details`} />
                    </div>
                }
              </div>
          }
        </div>
      </motion.div>
    </motion.div>
  );
  
};

FoodsCard.propTypes = {
  blogs: PropTypes.object,
  wishlistData: PropTypes.array,
};

export default FoodsCard;
