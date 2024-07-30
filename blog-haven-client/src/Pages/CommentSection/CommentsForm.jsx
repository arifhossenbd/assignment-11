/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import images from "../../Constants/images";
import { PulseLoader } from "react-spinners";
import LoadingButton from "../../Component/LoadingButton/LoadingButton";

const CommentsForm = ({ refetch, blogs }) => {

    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            if (blogs?.authorEmail === user?.email) {
                try {
                    toast.custom(
                        <div className='shadow p-4 rounded-xl bg-white'>
                            <div className="flex justify-center mx-auto"><img className="w-24" src={images?.caution} alt="" /></div>
                            <h2 className="md:text-2xl text-xl font-semibold">Oops...</h2>
                            <h2 className="md:text-xl font-semibold text-pink-800">Dear {user?.displayName}</h2>
                            <p>You cannot comment on your own blogs..!</p>
                        </div>
                    );
                    reset();
                    refetch();
                } catch (error) {
                    console.error(error)
                }
            } else {
                try {
                    const commentInfo = {
                        blogId: blogs?._id,
                        name: user?.displayName,
                        email: user?.email,
                        img: user?.photoURL,
                        comment: data?.comment,
                        createdAt: new Date()
                    };
                    const commentRes = await axiosSecure.post('/api/v1/create-comment', commentInfo);
                    if (commentRes?.data?.insertedId) {
                        toast.custom(
                            <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
                                <div className="flex justify-center mx-auto"><PulseLoader /></div>
                                <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
                                <h2 className="md:text-xl font-semibold text-pink-800">Dear {user?.displayName}</h2>
                                <p>Your comment has been added.!</p>
                            </div>
                        );
                        reset();
                        refetch();
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:px-16 px-8 md:py-8 py-4 md:space-y-8 space-y-3 rounded-xl h-fit shadow-lg dark:bg-gray-800 bg-gray-200 outline outline-1 outline-gray-500"
            >
                <div className='text-center space-y-2'>
                    <h2 className='md:text-2xl text-xl font-semibold text-gray-500 dark:text-gray-400'>Leave a Comment</h2>
                </div>
                <textarea
                    {...register("comment", { required: true })}
                    type="text"
                    className="p-4 w-full rounded-lg hover:outline outline-1 outline-gray-500 dark:bg-gray-900 dark:text-white"
                    placeholder="Type your valuable comment..."
                    rows={8}
                    required
                />
                {errors.comment && <span className="text-red-600">Comment is required</span>}
                <div className="flex justify-end text-gray-700">
                    <LoadingButton btnLabel={`Post Comment`} onClick={handleSubmit(onSubmit)} />
                </div>
            </form>
        </div>
    );
};

export default CommentsForm;
