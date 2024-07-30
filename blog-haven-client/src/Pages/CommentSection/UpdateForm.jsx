/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import images from "../../Constants/images";
import { PulseLoader } from "react-spinners";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const UpdateForm = ({ isOpenUpdateForm, handleCloseUpdateForm, refetch, comments }) => {

  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure()
  const [updateComplete, setUpdateComplete] = useState(false);
  const handleDismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  const onSubmit = async (data) => {
    if (user?.email === comments?.email) {
      try {
        const updateComment = {
          name: comments.name,
          email: comments.email,
          img: comments.img,
          comment: data.update,
          createdAt: new Date(),
        };
  
        const updateRes = await axiosSecure.patch(`/api/v1/comment/${comments._id}`, updateComment);
        console.log(updateRes);
        const result = await toast.custom(
          <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
            <div className="flex justify-center mx-auto"><PulseLoader /></div>
            <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
            <h2 className="md:text-xl font-semibold text-pink-800">Dear {user?.displayName}</h2>
            <p>Your comment has been updated!</p>
          </div>
        );
        setUpdateComplete(true);
        refetch();
        if (result.isConfirmed) {
          reset();
          handleCloseUpdateForm();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        toast.custom(
          <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700"> <div className="flex flex-col justify-end space-y-28">
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleDismiss('update')}>
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
            <div className="flex justify-center mx-auto"><img className="w-24" src={images?.caution} alt="" /></div>
            <h2 className="md:text-2xl text-xl font-semibold">Oops...</h2>
            <h2 className="md:text-xl font-semibold text-pink-800">Dear {user?.displayName}</h2>
            <p>You are not authorized to update this comment!</p>
          </div>
          ,
          {
            id: 'update',
            icon: 'none',
          }
        );
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  if (updateComplete) {
    handleCloseUpdateForm();
    setUpdateComplete(false);
  }
  

  return (
    <div className="pb-12">
      {isOpenUpdateForm
        &&
        <form onSubmit={handleSubmit(onSubmit)} className="px-16 py-8 space-y-8 rounded-xl bg-gray-200 h-fit shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-white">
              Update by Mr/Ms, <span className="text-xl pl-1">{user.displayName}</span>
            </h3>
            <button onClick={handleCloseUpdateForm} type="button" className="text-gray-700 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <textarea {...register("update", { required: true })} defaultValue={comments?.comment || ""} rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Leave a update..."></textarea>
            {errors.update && <span className="text-red-600">Update is required</span>}
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="submit" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-400 hover:border-white text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Update</button>
            <button onClick={handleCloseUpdateForm} type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-400 hover:border-white text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
          </div>
        </form>
      }
    </div>
  );
};

export default UpdateForm;
