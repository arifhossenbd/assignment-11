import CommentsLoading from "../../../Loading/CommentsLoading";
import useGet from "../../../../Hooks/useGet";
import { motion } from "framer-motion";

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
}

const CommentSection = () => {

    const { data: comments, isLoading, status, error } = useGet('/api/v1/comments') || {}
    if (isLoading) {
        return <CommentsLoading />;
    }
    const sortedComments = comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latestComments = sortedComments?.slice(0, 3);

    return (
        <motion.div
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
         className="space-y-2">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">Comments</h2>
            <div className="inline-flex items-center justify-center gap-5 w-full">
                <hr className="w-full h-0.5 bg-gray-200 border-0 dark:bg-gray-700" />
                <h2 className="text-base md:font-semibold text-fuchsia-500  dark:text-white">{comments?.length}</h2>
                <hr className="w-full h-0.5 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            {status === 'error' && !comments || comments?.length === 0 ?
                <div className="flex flex-col justify-center items-center mx-auto md:gap-5 gap-2">
                    <h2 className="dark:text-white">Comments currently not available</h2>
                    {error && <p className="dark:text-white">{error.message}</p>}
                </div>
                :
                <div className="space-y-5">
                    {
                        latestComments?.map((comment) => (
                            <div key={comment._id} className="">
                                <div className="flex gap-5 w-full">
                                    <img className="w-12 h-12 rounded-full" src={comment?.img} alt="comment" />
                                    <div className="w-full">
                                        <div className="font-normal text-xs md:text-sm text-gray-500 dark:text-white">{formatDate(comment?.createdAt)}</div>
                                        <div className="text-base md:text-lg md:font-semibold  dark:text-gray-400">{comment?.name}</div>
                                        <p className="md:text-sm text-xs dark:text-white">{comment?.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </motion.div>
    );
};

export default CommentSection;
