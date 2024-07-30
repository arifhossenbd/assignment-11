/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import { PulseLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
}
const WishlistTable = ({ wishlists, refetch, id, idx }) => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { authorImg, author, email, image, title, createdAt, blogId } = wishlists || {};

    const handleDismiss = (toastId) => {
        toast.dismiss(toastId);
    };

    const handleOpenModal = () => {
        const toastId = toast.custom(
            () => (
                <tr>
                    <td className="w-full rounded-lg shadow-xl bg-white dark:bg-gray-800 dark:text-gray-400 gap-2 space-y-4 p-6">
                        <div className="flex justify-between gap-8">
                            <img className="h-72 w-96 rounded-lg" src={image} alt="image" />
                            <div>
                                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleDismiss(toastId)}>
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
                            <div className="ms-3 text-sm font-normal">
                                <button className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={() => handleDelete(id)}>Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            ),
            {
                id: 'custom-toast',
                icon: 'none',
            }
        );
    };

    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(`/api/v1/wishlist/${id}`);
            console.log(res);
            if (res.data.deletedCount > 0) {
                toast.custom(
                    <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
                        <div className="flex justify-center mx-auto"><PulseLoader /></div>
                        <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
                        <h2 className="md:text-xl font-semibold text-pink-800">{user?.displayName}</h2>
                        <p className="text-sm">Your wishlist blog has been successfully deleted!</p>
                    </div>
                );
                refetch();
            }
        } catch (error) {
            toast.error("Error deleting wishlist item:", error);
            refetch();
        }
    };


    return (

        <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 hover:outline outline-1 outline-white dark:outline-gray-500">
            <td className="w-4 p-4">
                {idx + 1}
            </td>
            <td scope="row" className="flex items-center gap-2 px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={authorImg} alt="authorImg" />
                <div>
                    <h2 className="md:text-base md:font-semibold">{author}</h2>
                    <h2 className="font-normal text-gray-500 dark:text-white">{email}</h2>
                </div>
            </td>
            <td className="px-12 py-4">
                <img className="md:w-24 h-14 rounded-lg" src={image} alt="image" />
            </td>
            <td id="link" className="px-12 py-4 w-full">
                <Link
                    to={`/blog/details/${blogId}`}
                >
                    {title}
                </Link>
            </td>
            <td className="w-36">
                {formatDate(createdAt)}
            </td>
            <td className="pl-4 py-4">
                <button onClick={() => handleOpenModal()}><FiTrash className="w-5 h-5" /></button>
            </td>
        </tr>
    );
};

export default WishlistTable;