/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
}

const HeroCard = ({ blogs }) => {
    const { image, title, category, shortDesc, author, date } = blogs || {};
    return (
        <div>
            <div className="space-y-1 md:space-y-3 dark:text-white">
                <div className="text-center space-y-1 md:space-y-3">
                    <div className="inline-flex items-center justify-center gap-5 w-full">
                        <hr className="w-20 h-0.5 bg-gray-200 border-0 dark:bg-gray-300" />
                        <motion.h2 className="md:font-semibold uppercase text-xs md:text-base hover:text-pink-700 text-gray-700 dark:text-gray-300 dark:hover:text-green-200"
                        initial={{x: -200}}
                        animate={{x: 0}}
                        transition={{delay: 1, duration: 1}}
                        ><Link to={`/blogs/${category}`}>{category}</Link></motion.h2>
                        <hr className="w-20 h-0.5 bg-gray-200 border-0 dark:bg-gray-300" />
                    </div>
                    <motion.div
                     initial={{x: 1000}}
                     animate={{x: 0}}
                     transition={{delay: 1, duration: 1}}
                     ><Link className="md:text-4xl font-semibold rounded-t-lg hover:text-sky-500 dark:hover:text-fuchsia-500 text-gray-700 dark:text-gray-200"
                        to={`/blog/details/${blogs?._id}`}
                    >
                        {title}
                    </Link></motion.div>
                </div>
                <div className="flex justify-center items-center dark:text-gray-200 gap-1">
                    <p className="hover:text-indigo-600 text-xs md:text-sm">{formatDate(date)}</p>| <h2 className="text-gray-700 text-xs md:text-base font-semibold dark:text-gray-300">BY <span className="uppercase hover:text-fuchsia-500">{author}</span></h2>
                </div>
                <div className="space-y-5 h-96 pt-2 md:pt-5">
                    <motion.img
                     initial={{y: -100}}
                     animate={{y: 0}}
                     transition={{delay: 2, duration: 1.5}}
                     className="w-full md:h-96 h-64 rounded-2xl" src={image} alt="img" />
                    <h2 className="md:text-lg text-sm">{shortDesc}</h2>
                </div>
            </div>
        </div>
    );
};
export default HeroCard;