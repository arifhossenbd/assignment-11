import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingButton from "../../../Component/LoadingButton/LoadingButton";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll } from "framer-motion";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const AddBlog = () => {

  const { user } = useAuth()
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const axiosPublic = useAxiosPublic()
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const [fileUrl, setFileUrl] = useState(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] }
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      if (res?.data?.success) {
        const createBlog = {
          title: data?.title,
          category: data?.category,
          shortDesc: data?.shortDesc,
          fullDesc: data?.fullDesc,
          image: res?.data?.data?.display_url,
          author: user?.displayName,
          authorImg: user?.photoURL,
          email: user?.email,
          date: new Date()
        };
        const blogRes = await axiosPublic.post('/api/v1/create-blog', createBlog);
        if (blogRes.data.insertedId) {
          reset();
          toast.custom(
            <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
              <div className="flex justify-center mx-auto"><PulseLoader /></div>
              <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
              <h2 className="md-text-xl text-lg font-semibold text-pink-800">Mr/Ms, {user?.displayName}!</h2>
              <h2 className="font-semibold">Your blog has been successfully added.</h2>
              <p>Thank you for your contribution!</p>
            </div>
          );
          <Navigate to="/" state={{ from: location }} replace></Navigate>

        }
      } else {
        console.error('ImgBB API Error:', res.data.error.message);
      }
    } catch (error) {
      console.error('Axios Error:', error.message);
    }
  };

  const handleFile = (event) => {
    const files = event?.target?.files;

    if (files.length > 0 && files[0].type.startsWith("image/")) {
      const url = URL.createObjectURL(files[0]);
      setFileUrl(url);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="dark:bg-gray-900">
      <div className="flex justify-center mx-auto py-8 px-4 md:px-0">
        <Helmet>
          <title>Blog Haven | Create</title>
        </Helmet>
        <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
         className="md:w-1/2 w-96 p-4 md:p-8 rounded-2xl shadow bg-gray-200 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-5">
            <Link to="/"><button className="outline text-gray-700 outline-white hover:outline-gray-500 outline-1 shadow-lg hover:bg-gray-200 hover:animate-pulse hover:text-black rounded-lg flex items-center justify-center gap-2 px-4 py-1 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800">Go Back Home</button></Link>
            <h2 className="dark:text-gray-400 text-gray-500 text-2xl xl:text-4xl font-semibold">
              Add Blog
            </h2>
          </div>
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-fit mx-auto pt-4">
            <form>
              <div className="mb-6">
                <label className="block mb-2 md:text-lg font-medium text-gray-900 dark:text-white">Title<span className="text-red-600">*</span></label>
                <input {...register("title", { required: true })} name="title" type="text" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.title?.type === "required" && (
                  <p className="text-red-500" role="alert">Title is required</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Category</label>
                <select
                  {...register('category', { required: true })}
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a category</option>
                  <option value="food">Food</option>
                  <option value="health">Health</option>
                  <option value="fashion">Fashion</option>
                  <option value="technology">Technology</option>
                  <option value="travel">Travel</option>
                </select>
                {errors.category?.type === "required" && (
                  <p className="text-red-500" role="alert">Category is required</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 md:text-lg font-medium text-gray-900 dark:text-white">Short Description<span className="text-red-600">*</span></label>
                <textarea {...register("shortDesc", { required: true })} name="shortDesc" rows={3} type="text" placeholder="Short Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.shortDesc?.type === "required" && (
                  <p className="text-red-500" role="alert">Short description is required</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 md:text-lg font-medium text-gray-900 dark:text-white">Full Description<span className="text-red-600">*</span></label>
                <textarea {...register("fullDesc", { required: true })} name="fullDesc" rows={6} type="text" placeholder="Full Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.fullDesc?.type === "required" && (
                  <p className="text-red-500" role="alert">Full description is required</p>
                )}
              </div>
              <div className="space-y-5">
                {fileUrl && (
                  <div className="mt-2 h-80 rounded-lg overflow-hidden">
                    <img
                      src={fileUrl}
                      alt="Uploaded"
                    />
                  </div>
                )}
                <input
                  type="file"
                  {...register("image", { required: true })}
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleFile} className="w-full rounded-lg bg-gray-300 outline text-gray-700 outline-white hover:outline-gray-500 outline-1" />
                {errors.image && <span className="text-red-600">Image is required</span>}
              </div>
              <div className="pt-5">
                <LoadingButton className={`w-full`} btnLabel={`Add Blog`} onClick={handleSubmit(onSubmit)} />
              </div>
            </form>
          </motion.div>
        </motion.div>
        <motion.div
          className="progress"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </div>
  );
}
export default AddBlog;
