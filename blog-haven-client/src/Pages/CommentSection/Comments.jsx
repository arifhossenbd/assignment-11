/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import DataLoading from "../../Component/Loading/DataLoading";
import CommentsForm from "./CommentsForm";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useRef, useState } from "react";
import { useClickOutside } from "../../Hooks/useClickOutside";
import UpdateForm from "./UpdateForm";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import images from "../../Constants/images";
import useGet from "../../Hooks/useGet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
}

const Comments = ({ blogs }) => {
    
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: comments, isLoading, refetch } = useGet('/api/v1/comments') || {};
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [updateComment, setUpdateComment] = useState(null);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const formRef = useRef(null);

    const closeForm = () => {
        setIsOpenUpdateForm(false);
        setUpdateComment(null);
        setSelectedCommentId(null);
    };

    useClickOutside(formRef, closeForm);

    const handleOpenUpdateForm = (commentId) => {
        setIsOpenUpdateForm(true);
        setUpdateComment(commentId);
        setSelectedCommentId(commentId);
    };

    const handleCloseUpdateForm = () => {
        setIsOpenUpdateForm(false);
        setUpdateComment(null);
        setSelectedCommentId(null);
    };

    if (isLoading) {
        return <DataLoading />;
    }

    const filteredComments = comments?.filter(comment => comment?.blogId === blogs?._id) || [];

    const handleDismiss = (toastId) => {
        toast.dismiss(toastId);
    };

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const res = await axiosSecure.delete(`/api/v1/comment/${id}`);
            console.log(res);
            if (res.data.deletedCount > 0) {
                toast.custom(
                    <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
                        <div className="flex justify-center mx-auto"><PulseLoader /></div>
                        <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
                        <h2 className="md:text-xl font-semibold text-pink-800">Dear {user?.displayName}</h2>
                        <p>Your comment has been deleted!</p>
                    </div>
                );
                refetch();
            }
        } catch (error) {
            toast.error("Error deleting comment:", error);
            refetch();
        }
        toast.dismiss('custom-toast');
    };

    const handleOpenModal = (id, commentOwner) => {
        if (commentOwner === user?.email) {
            try {
                toast.custom(
                    () => (
                        <div>
                            <div className="flex justify-between w-full max-w-xs p-4 px-5 rounded-lg shadow-xl bg-white dark:bg-gray-800 dark:text-gray-400 gap-2">
                                <div className="space-y-2">
                                    <div className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">You won't be able to revert this!</div>
                                    <img className="w-36" src={images?.caution} alt="image" />
                                </div>
                                <div className="flex flex-col justify-end space-y-36">
                                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleDismiss('custom-toast')}>
                                        <span className="sr-only">Close</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                    <div className="ms-3 text-sm font-normal">
                                        <button className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={() => handleDelete(id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                    {
                        id: 'custom-toast',
                        icon: 'none',
                    }
                );
                refetch();
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                toast.custom(
                    <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700"> <div className="flex flex-col justify-end space-y-28">
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleDismiss('custom-toast')}>
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                        <div className="flex justify-center mx-auto"><img className="w-24" src={images?.caution} alt="" /></div>
                        <h2 className="md:text-2xl text-xl font-semibold">Oops...</h2>
                        <h2 className="md:text-xl font-semibold text-pink-800">Dear {user?.displayName}</h2>
                        <p>You are not authorized to delete this comment!</p>
                    </div>
                    ,
                    {
                        id: 'custom-toast',
                        icon: 'none',
                    }
                );
                refetch();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div ref={formRef} className="space-y-8">
            <h2 className="md:text-3xl text-2xl font-semibold text-gray-500 dark:text-gray-300">Comments</h2>
            <div>
                <div className="divide-y-2 divide-gray-300">
                    {filteredComments?.map((comment) => (
                        <div key={comment?._id}>
                            <div className="flex gap-5 w-full p-8 dark:text-gray-300">
                                <img className="w-24 h-24 rounded-full" src={comment?.img} alt="user" />
                                <div className="w-full space-y-2">
                                    <div className="font-normal text-sm text-gray-500 dark:text-gray-300">{formatDate(comment?.createdAt)}
                                    </div>
                                    <div className="text-base md:text-lg font-semibold">{comment.name}</div>
                                    <p className="pt-3 text-xs md:text-sm dark:text-gray-50">{comment?.comment}</p>
                                    <div className="flex gap-5 lg:gap-10 pt-4">
                                        <button onClick={() => handleOpenUpdateForm(comment?._id)} className="inline-flex gap-1 text-base"><FiEdit className="w-5 h-5" /> Update</button>
                                        <button onClick={() => handleOpenModal(comment?._id, comment?.email)} className="inline-flex gap-1 text-base"><FiTrash className="w-5 h-5" /> Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div >
                                {isOpenUpdateForm && selectedCommentId === comment._id && (
                                    <UpdateForm
                                        updateComment={updateComment}
                                        handleOpenUpdateForm={handleOpenUpdateForm}
                                        handleCloseUpdateForm={handleCloseUpdateForm}
                                        isOpenUpdateForm={isOpenUpdateForm}
                                        comments={comment}
                                        refetch={refetch}
                                    />
                                )}

                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <CommentsForm refetch={refetch} blogs={blogs} />
                </div>
            </div>
        </div >
    );
}

export default Comments;
